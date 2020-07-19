class Api::V1::CharactersController < ApiController
  include CrystalHelper

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
    chars = get_user(params['user_id']).characters ||
      Campaign.find(params['campaign_id'])
    render json: chars
  end

  def show
    char = Character.find_by(
      crystal: params['character_id'] || params['id']
    )
    render json: char, serializer: CharacterShowSerializer
  end

  private

  def not_found
    render_error 404, "Could not find requested character(s)"
  end
end
