class ApiController < ApplicationController
  protect_from_forgery with: :null_session, unless: -> { request.format.json? }

  private
  def require_login
    if !current_user
      render json: {
        status: "fail",
        data: { "message": "User must be logged in to perform this action." }
      }
    end
  end
end
