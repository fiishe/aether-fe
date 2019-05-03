require 'date'

class DevController < ApplicationController
  before_action :require_dev_environment

  def pry
    binding.pry
    flash_confirmation("binding.pry")
    redirect_to "/"
  end

  def login
    session[:user_id] = params['id']
    session[:expires_at] = DateTime.now + 7.days
    flash_confirmation("log in with id #{params['id']}")
    redirect_to "/users/me"
  end

  def logout
    session[:user_id] = nil
    flash_confirmation("log out")
    redirect_to "/"
  end

  private

  def require_dev_environment
    if !(Rails.env.development?)
      redirect_to "/"
    end
  end

  def flash_confirmation(message)
    flash[:notice] = "Completed dev action: #{message}"
  end
end
