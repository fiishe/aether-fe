require "rails_helper"

RSpec.describe Api::V1::InvitesController, type: :controller do
  before :all do
    @invite = FactoryBot.create(:invite)
    @campaign = @invite.campaign
    @user = @campaign.owner
    CampaignMembership.create(user: @user, campaign: @campaign, role: 'owner')
  end

  describe "index" do
    it "lists invite links belonging to a campaign" do
      login @user
      get :index, params: { campaign_id: @campaign.crystal }

      expect(res_json[0]).to eq(
        { 'token' => @invite.token, 'expires_at' => @invite.expires_at,
          'uses' => @invite.uses }
      )
    end

    it "fails if user is not logged in" do
      logout()
      get :index, params: { campaign_id: @campaign.crystal }

      expect(res_json['code']).to eq(401)
    end

    it "fails if user is not a member" do
      other_user = FactoryBot.create(:user)
      login other_user
      get :index, params: { campaign_id: @campaign.crystal }

      expect(res_json['code']).to eq(403)
    end

    it "fails if no such campaign exists" do
      login @user
      get :index, params: { campaign_id: "asdfasdfasdf" }
      expect(res_json['code']).to eq(404)
    end
  end
end
