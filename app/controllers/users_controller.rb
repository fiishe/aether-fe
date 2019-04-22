class UsersController < ApplicationController
  def index
    render "/react"
  end

  def login
    client_id = ENV['DISCORD_CLIENT_ID']
    redirect_uri = request.original_url + "/callback"
    state = SecureRandom.urlsafe_base64
    cookies.encrypted[:auth_state] = { value: state, expires: 1.minute }

    redirect_to "https://discordapp.com/api/oauth2/authorize?client_id=#{client_id}&redirect_uri=#{redirect_uri}&response_type=code&scope=identify&state=#{state}"
    # Discord prompts user to authorize AetherFE to access their account,
    # then redirects to callback (below).
  end

  def callback
    if params[:state] == cookies.encrypted[:auth_state]
      puts "Obtained code!"
    else
      puts "Login failed due to mismatched states"
    end
    redirect_to "/"
  end
end
