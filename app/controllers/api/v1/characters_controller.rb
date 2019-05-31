class Api::V1::CharactersController < ApiController
  def index
    chars = get_user(params['user_id']).characters || Campaign.find(params['campaign_id'])
    render json: chars
  end

  def show
    begin
      render json: Character.find(params['character_id'] || params['id']),
        serializer: CharacterShowSerializer
    rescue ActiveRecord::RecordNotFound
      render json: {
        status: "fail",
        data: { message: "Could not find character with given ID" },
        code: 404
      }
    end
  end
end
