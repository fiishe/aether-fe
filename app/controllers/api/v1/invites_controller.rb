class Api::V1::InvitesController < ApiController
  include CampaignAuthHelper

  before_action :require_login
  before_action :require_campaign_membership, only: [:index]
  before_action :require_campaign_admin, only: [:create]

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
end
