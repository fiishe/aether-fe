require 'net/http'
require 'date'

class UsersController < ApplicationController
  DISCORD_API_ENDPOINT = "https://discordapp.com/api"

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
    if params[:state] != cookies.encrypted[:auth_state]
      raise "Login failed due to bad state variable"
    end
    token_response = discord_exchange_code(params[:code])
    user_data = discord_get_user(token_response['access_token'])

    entry = {
      snowflake: user_data['id'],
      username: user_data['username'],
      discriminator: user_data['discriminator'],
      access_token: token_response['access_token'],
      access_token_issued: DateTime.now,
      refresh_token: token_response['refresh_token']
    }

    user = User.find_by(snowflake: user_data['id'])
    if user
      user.update(entry)
    else
      binding.pry
      user = User.create(entry)
    end

    session[:user_id] = user.id
    session[:expires_at] = DateTime.now + 7.days
      # user access token for dAPi also expires after 7days
    puts "New session with id #{user.id}"

    redirect_to "/"
  end

  private
  def discord_exchange_code(code)
    data = {
      client_id: ENV['DISCORD_CLIENT_ID'],
      client_secret: ENV['DISCORD_CLIENT_SECRET'],
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: root_url + "login/callback"
    }
    header = { 'Content-Type' => 'application/x-www-form-urlencoded' }

    fetch = Thread.new {
      res = Net::HTTP.post(
        URI("#{DISCORD_API_ENDPOINT}/oauth2/token"),
        URI.encode_www_form(data),
        header
      )
      JSON.parse(res.body)
    }
    return fetch.value
  end

  def discord_get_user(access_token)
    uri = URI("#{DISCORD_API_ENDPOINT}/users/@me")
    req = Net::HTTP::Get.new(uri)
    req['Authorization'] = "Bearer #{access_token}"

    fetch = Thread.new {
      res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') { |http|
        http.request(req)
      }
      JSON.parse(res.body)
    }
    return fetch.value
  end
end
