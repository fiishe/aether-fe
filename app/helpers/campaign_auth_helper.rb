# Methods for restricting access to resources based on user's permissions
# in the related campaign.

module CampaignAuthHelper
  def user_is_member(campaign)
    !get_membership(campaign).nil?
  end

  def user_is_admin(campaign)
    return false if get_membership(campaign).nil?
    @campaign_membership.role == "admin" || @campaign_membership.role == "owner"
  end

  def user_is_owner(campaign)
    return false if get_membership(campaign).nil?
    @campaign_membership.role == "owner"
  end

  def set_campaign(campaign)
    # Determine which campaign the below methods refer to
    @campaign = campaign
  end

  def require_campaign_membership
    if !user_is_member(@campaign)
      deny_permission()
    end
  end

  def require_campaign_admin
    if !user_is_admin(@campaign)
      deny_permission()
    end
  end

  def require_campaign_owner
    if !user_is_owner(@campaign)
      deny_permission()
    end
  end

  private

  def get_membership(campaign)
    @campaign_membership = CampaignMembership.find_by(
      user: current_user, campaign: @campaign
    )
  end

  def deny_permission
    render_error 403, "You do not have permission to access this resource."
  end
end
