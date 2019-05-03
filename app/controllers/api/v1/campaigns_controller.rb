class Api::V1::CampaignsController < ApiController
  before_action :require_login, only: [:create]

  def index
    user = get_user(params['user_id'])

    if user.nil?
      render json: Campaign.limit(20)
    else
      binding.pry
      render json: user.campaigns
    end
  end

  def show
  end

  def create
    @campaign = Campaign.new(campaign_params)
    @campaign.owner_id = current_user.id
    if @campaign.save
      render json: {
        status: "success",
        data: { campaign: @campaign.as_json(only: [:name]) }
      }
    else
      render json: {
        status: "fail",
        data: {
          message: "Form validation failed",
          errors: @campaign.errors.full_messages
        }
      }
    end
  end

  private

  def campaign_params
    params.require(:campaign).permit(:name)
  end
end
