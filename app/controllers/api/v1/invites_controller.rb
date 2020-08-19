class Api::V1::InvitesController < ApiController
  include CampaignAuthHelper

  before_action :require_login
  before_action :require_campaign_membership, only: [:index]

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
    render json: @campaign.invites
  end

  def create

  end
end
