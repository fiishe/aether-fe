class InvitesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def show
    token = invite_params['id']
    @invite = Invite.find_by!(token: token)
    @logged_in = !current_user.nil?

    return unless invite_is_valid

    @campaign = @invite.campaign
  end

  def join
    token = invite_params['id']
    if !current_user
      redirect_to "/invite/#{token}"
      return
    end

    @invite = Invite.find_by!(token: token)
    @campaign = @invite.campaign

    return unless invite_is_valid

    membership = CampaignMembership.find_or_create_by(
      user: current_user,
      campaign: @campaign
    ) do
      # if CampaignMembership was created
      if @invite.uses
        @invite.uses -= 1
        @invite.save
      end
    end

    redirect_to "/campaigns/#{@campaign.crystal}"
  end

  private

  def invite_params
    params.permit :id
  end

  def not_found
    @campaign = nil
    render "/invites/show"
  end

  def invite_is_valid
    if @invite.expires_at
      if DateTime.now > @invite.expires_at
        @campaign = nil
        render "/invites/show"
        return false
      end
    end

    if @invite.uses
      if @invite.uses <= 0
        @campaign = nil
        render "/invites/show"
        return false
      end
    end

    return true
  end
end
