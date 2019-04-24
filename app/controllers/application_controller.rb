require 'date'

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    return unless session[:user_id]

    if session[:expires_at] < DateTime.now
      session[:user_id] = nil
      return
    end
    @current_user ||= User.find(session[:user_id])
  end
end
