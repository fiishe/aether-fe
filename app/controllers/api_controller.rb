class ApiController < ApplicationController
  protect_from_forgery with: :null_session, unless: -> { request.format.json? }

  private
  def require_login
    return unless logged_in
  end

  def logged_in
    if current_user.nil?
      render json: {
        status: "fail",
        data: { "message": "User must be logged in to perform this action." }
      }
      return false
    else
      return true
    end
  end
end
