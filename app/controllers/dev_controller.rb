class DevController < ApplicationController
  before_action :require_dev_environment

  def pry
    binding.pry
    redirect_to "/"
  end

  def login
    session[:user_id] = params['id']
    redirect_to "/users/me"
  end

  private

  def require_dev_environment
    if !(Rails.env.development?)
      redirect_to "/"
    end
  end
end
