class Api::V1::ErrorsController < ApiController
  def not_found
    render json: {
      status: "fail",
      data: { "message": "404 Not Found" },
      code: 404
    }
  end
end
