class Api::V1::CampaignsController < ApiController
  def index
    render json: Campaign.limit(20)
  end
end
