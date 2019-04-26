class Api::V1::CampaignsController < ApiController
  def index
    render json: Campaign.limit(20)
  end

  def show
  end

  def new

  end
end
