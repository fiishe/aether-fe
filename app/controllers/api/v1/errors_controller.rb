class Api::V1::ErrorsController < ApiController
  def not_found
    render_error(404)
  end
end
