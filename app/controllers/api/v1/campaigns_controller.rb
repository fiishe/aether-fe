class Api::V1::CampaignsController < ApiController
  before_action :require_login, only: [:create]

  def index
    begin
      user = get_user(params['user_id'])
      render json: user.campaigns, each_serializer: CampaignSerializer
    rescue ActiveRecord::RecordNotFound
      render json: {
        status: "fail",
        data: { message: "Could not find user with given ID" },
        code: 404
      }
    end
  end

  def show
  end

  def create
    @campaign = Campaign.new(campaign_params)

    if @campaign.save
      CampaignMembership.create(
        user: current_user,
        campaign: @campaign,
        role: "owner"
      )

      server_log "Campaign #{@campaign.name} (id: #{@campaign.id}) created"
      render json: {
        status: "success",
        data: { campaign: @campaign.as_json(only: [:name]) }
      }
    else
      render json: {
        status: "fail",
        data: {
          message: "Validation failed",
          errors: @campaign.errors.full_messages
        }
      }
    end
  end

  private

  def campaign_params
    params.permit(:name)
  end
end
