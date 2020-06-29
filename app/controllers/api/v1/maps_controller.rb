class Api::V1::MapsController < ApiController
  def create
    @map = Map.new(map_params)
    @map.creator_id = current_user.id

    if @map.save
      render json: {
        status: "success",
        data: { map: @map.as_json(only: [:name, :creator_id]) }
      }
    else
      @map.background_image.purge
      render json: {
        status: "fail",
        data: {
          message: "Validation failed",
          errors: @map.errors.full_messages
        }
      }
    end
  end

  private

  def map_params
    params.permit(
      :name, :width, :height, :tile_size, :tile_data, :grid_alpha, :grid_color,
      :background_image
    )
  end
end
