class Api::V1::MapsController < ApiController
  def create
    @map = Map.new()
  end

  private

  def map_params
    params.require(:map).permit(
      :name, :width, :height, :tile_size, :tile_data
    )
  end
end
