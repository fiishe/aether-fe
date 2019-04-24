require 'net/http'

class UsersController < ApplicationController
  DISCORD_API_ENDPOINT = "https://discordapp.com/api/v6"

  def index
    render "/react"
  end

  def login
    client_id = ENV['DISCORD_CLIENT_ID']
    redirect_uri = root_url + "login/callback"
    state = SecureRandom.urlsafe_base64
    cookies.encrypted[:auth_state] = { value: state, expires: 1.minute }

    redirect_to "#{DISCORD_API_ENDPOINT}/oauth2/authorize?client_id=#{client_id}&redirect_uri=#{redirect_uri}&response_type=code&scope=identify&state=#{state}"
    # Discord prompts user to authorize AetherFE to access their account,
    # then redirects to callback (below).
  end

  def callback
    if params[:state] == cookies.encrypted[:auth_state]
      token_response = exchange_code(params[:code], root_url)
      expected_keys = ["access_token", "scope", "token_type", "expires_in", "refresh_token"]

      if token_response.keys == expected_keys
        # Do stuff here with the response
      else
        puts "Login failed due to failed code exchange"
      end
    else
      puts "Login failed due to mismatched states"
    end
    redirect_to "/"
  end

  private
  def exchange_code(code, redirect_uri)
    data = {
      client_id: ENV['DISCORD_CLIENT_ID'],
      client_secret: ENV['DISCORD_CLIENT_SECRET'],
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri + "login/callback"
    }
    header = { 'Content-Type' => 'application/x-www-form-urlencoded' }

    request_exchange = Thread.new {
      res = Net::HTTP.post(
        URI("https://discordapp.com/api/v6/oauth2/token"),
        URI.encode_www_form(data),
        header
      )
      JSON.parse(res.body)
    }
    return request_exchange.value
  end
end
