class ApiController < ApplicationController
  protect_from_forgery with: :null_session, unless: -> { request.format.json? }

  private
  def require_login
    return unless logged_in
  end

  def logged_in
    if current_user.nil?
      render_error 401, "User must be logged in to perform this action."
      return false
    else
      return true
    end
  end

  def render_error(code, message)
    render json: {
      status: "fail",
      data: { "message": message },
      code: code
    }, status: code
  end

  def not_found
    render_error 404, "Could not find requested resource(s)"
  end
end
