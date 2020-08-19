# Methods for restricting access to resources based on user's permissions
# in the related campaign.

module CampaignAuthHelper
  def require_campaign_membership
    if campaign_membership.nil?
      deny_permission()
      return false
    end
  end

  def require_campaign_admin
    require_campaign_membership()

    if @campaign_membership.role != "admin" &&
       @campaign_membership.role != "owner"
      deny_permission()
      return false
    end
  end

  def require_campaign_owner
    require_campaign_membership()

    if @campaign_membership.role != "owner"
      deny_permission()
      return false
    end
  end

  private

  def campaign_membership
    @campaign = Campaign.find_by!(crystal: params['campaign_id'])

    @campaign_membership = CampaignMembership.find_by(
      user: current_user, campaign: @campaign
    )
  end

  def deny_permission
    render_error 403, "You do not have permission to access this resource."
  end
end
