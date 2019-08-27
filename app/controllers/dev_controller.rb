require 'date'

class DevController < ApplicationController
  before_action :require_dev_environment

  def pry
    binding.pry
    flash_confirmation("binding.pry")
    redirect_to "/"
  end

  def login
    user = User.find(params['id'])
    session[:user_id] = params['id']
    session[:expires_at] = DateTime.now + 7.days
    flash_confirmation("log in as #{user.nick || user.username}")
    redirect_to "/home"
  end

  def logout
    reset_session
    flash_confirmation("log out")
    redirect_to "/"
  end

  private

  def require_dev_environment
    if !(Rails.env.development? || Rails.env.test?)
      redirect_to "/"
    end
  end

  def flash_confirmation(message)
    flash[:notice] = "Completed dev action: #{message}"
  end
end
