require 'net/http'
require 'date'

class UsersController < ApplicationController
  before_action :set_avatar_url

  DISCORD_API_ENDPOINT = "https://discordapp.com/api"
  DISCORD_CDN_ENDPOINT = "https://cdn.discordapp.com"
  REQUESTED_SCOPE = "identify"

  def landing
    if !current_user.nil?
      render "/react"
      return
    end
    render "/landing"
  end

  def home
    if current_user.nil?
      redirect_to "/"
      return
    end
    render "/react"
  end

  def not_found
    render "/not_found"
  end

  def login
    if current_user
      redirect_to "/home"
      return
    end

    client_id = ENV['DISCORD_CLIENT_ID']
    redirect_uri = CGI::escape(request.base_url + "/login/callback")
    state = SecureRandom.urlsafe_base64
    cookies.encrypted[:auth_state] = { value: state, expires: 1.minute }

    redirect_to "#{DISCORD_API_ENDPOINT}/oauth2/authorize?client_id=#{client_id}&redirect_uri=#{redirect_uri}&response_type=code&scope=#{REQUESTED_SCOPE}&state=#{state}"
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
      refresh_token: token_response['refresh_token'],
      avatar_url: "#{DISCORD_CDN_ENDPOINT}/avatars/#{user_data['id']}/#{user_data['avatar']}.png"
    }

    user = User.find_by(snowflake: user_data['id'])
    if user
      if user.access_token == entry[:access_token]
        entry = entry.except(:access_token_issued)
      end
      user.update(entry)
      server_log "User logged in with ID #{user.snowflake}"
    else
      user = User.create(entry)
      server_log "New user registered with ID #{user.snowflake}"
    end

    session[:user_id] = user.id
    session[:expires_at] = DateTime.now + 7.days
      # user access token for dAPI also expires after 7days
    puts "New session with id #{user.id}"

    flash[:success] = "Successfully logged in as #{user.nick || user.username}"
    redirect_to "/home"
  end

  def logout
    reset_session
    flash[:success] = "Successfully logged out"
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
    request = Net::HTTP::Get.new(uri)
    request['Authorization'] = "Bearer #{access_token}"

    fetch = Thread.new {
      res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') { |http|
        http.request(request)
      }
      JSON.parse(res.body)
    }
    return fetch.value
  end

  def set_avatar_url
    if current_user
      @avatar_url = current_user.avatar_url
    end
  end
end
