class Api::V1::ErrorsController < ApiController
  def not_found
    render_error 404, "No endpoint exists at this route"
  end
end
