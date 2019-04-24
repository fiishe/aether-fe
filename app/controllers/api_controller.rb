class ApiController < ApplicationController
  protect_from_forgery with: :null_session, unless: -> { request.format.json? }

  def render_error(status_code)
    errors = {
      401 => '401: Unauthorized',
      403 => '403: Forbidden',
      404 => '404: Not Found',
      500 => '500: Internal Server Error'
    }
    render json: {message: errors[status_code]}
  end
end
