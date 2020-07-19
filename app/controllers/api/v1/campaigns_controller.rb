class Api::V1::CampaignsController < ApiController
  include CrystalHelper

  before_action :require_login, only: [:show, :create]
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
    user = get_user(params['user_id'])
    render json: user.campaigns
  end

  def show
    @campaign = Campaign.find_by!(crystal: params['id'])

    if CampaignMembership.find_by(user: current_user, campaign: @campaign).nil?
      render_error 403, "You do not have permission to access this resource."
    else
      render json: @campaign
    end
  end

  def create
    @campaign = Campaign.new(campaign_params)
    @campaign.owner = current_user

    @campaign.crystal = generate_crystal()

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
    params.require(:campaign).permit(:name)
  end

  def not_found
    render_error 404, "Could not find requested campaign(s)."
  end
end
