class Api::V1::InvitesController < ApiController
  before_action :require_login
  before_action :require_campaign_membership, only: [:index]
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
    render json: @campaign.invites
  end

  private

  def require_campaign_membership
    return unless user_is_member
  end

  def user_is_member
    @campaign = Campaign.find_by!(crystal: params['campaign_id'])
    if CampaignMembership.find_by(user: current_user, campaign: @campaign).nil?
      render_error 403, "You do not have permission to access this resource."
      return false
    else
      return true
    end
  end
end
