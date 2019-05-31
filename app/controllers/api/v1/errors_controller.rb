class Api::V1::ErrorsController < ApiController
  def not_found
    render json: {
      status: "fail",
      data: { message: "No endpoint exists at this route" },
      code: 404
    }
  end
end
