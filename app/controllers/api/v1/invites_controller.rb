class Api::V1::InvitesController < ApiController
  include CampaignAuthHelper

  before_action :require_login

  before_action only: [:index, :create] do
    set_campaign Campaign.find_by!(crystal: params['campaign_id'])
  end
  before_action only: [:destroy] do
    @invite = Invite.find_by!(token: params['id'])
    set_campaign @invite.campaign
  end

  before_action :require_campaign_membership, only: [:index]
  before_action :require_campaign_admin, only: [:create, :destroy]

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
    render json: @campaign.invites
  end

  def create
    @invite = Invite.new(campaign: @campaign)

    @invite.token = SecureRandom.alphanumeric 8
    @invite.save

    if @invite.save
      render json: {
        status: "success",
        data: { invite: @invite.as_json(serializer: InviteSerializer) }
      }
    else
      render json: {
        status: "fail",
        data: { message: "Internal server error" },
        code: 500
      }
    end
  end

  def destroy
    @invite.destroy

    render json: {
      status: "success"
    }
  end
end
