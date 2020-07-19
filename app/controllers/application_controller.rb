require 'date'

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private

  def server_log(msg)
    puts ">> LOG: #{msg}"
  end

  def get_user(snowflake)
    if snowflake == "me"
      return current_user
    else
      user = User.find_by(snowflake: snowflake)
      if user.nil?
        raise ActiveRecord::RecordNotFound
      end
      return user
    end
  end

  def current_user
    return unless session[:user_id]

    if session[:expires_at] < DateTime.now
      server_log "authentication failed due to expired session"
      session[:user_id] = nil
      return
    end
    @current_user ||= User.find(session[:user_id])
  end
end
