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
      puts "Obtained code!"
      exchange_code(params[:code], "http://localhost:3000")
    else
      puts "Login failed due to mismatched states"
    end
    redirect_to "/"
  end

  private
  def exchange_code(code, redirect_to)
    data = {
      client_id: ENV['DISCORD_CLIENT_ID'],
      client_secret: ENV['DISCORD_CLIENT_SECRET'],
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_to
    }
    req = Thread.new {
      res = Net::HTTP.post(
        URI("https://discordapp.com/api/v6/oauth2/token"),
        URI.encode_www_form(data),
        'Content-Type' => 'application/x-www-form-urlencoded'
      )
      binding.pry
    }
    req.join
  end
end
