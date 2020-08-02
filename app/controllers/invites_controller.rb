class InvitesController < ApplicationController
  def show
    token = invite_params['id']
    @invite = Invite.find_by(token: token)
    if @invite
      @campaign = @invite.campaign
    end

    @logged_in = !current_user.nil?
  end

  private

  def invite_params
    params.permit :id
  end
end
