class InvitesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def show
    token = invite_params['id']
    @invite = Invite.find_by(token: token)
    @logged_in = !current_user.nil?

    is_expired = false
    begin
      if DateTime.now > @invite.expires_at
        is_expired = true
      end
    rescue NoMethodError, ArgumentError
      # @invite is nil, or @invite.is_expired is nil
      is_expired = false
    end

    if @invite && !is_expired
      @campaign = @invite.campaign
    end
  end

  def join
    token = invite_params['id']
    if !current_user
      redirect_to "/invite/#{token}"
      return
    end

    invite = Invite.find_by!(token: token)
    campaign = invite.campaign

    membership = CampaignMembership.find_or_create_by(
      user: current_user,
      campaign: campaign
    )
    redirect_to "/campaigns/#{campaign.crystal}"
  end

  private

  def invite_params
    params.permit :id
  end

  def not_found
    render "/not_found"
  end
end
