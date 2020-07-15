require "rails_helper"

RSpec.describe Api::V1::CampaignsController, type: :controller do
  before :each do
    @campaign = FactoryBot.create(:campaign)
    @user = FactoryBot.create(:user)
    CampaignMembership.create(
      { campaign: @campaign, user: @user, role: 'member' }
    )
    login(@user)
  end

  describe "index" do
    it "lists campaigns a user is in" do
      campaign2 = FactoryBot.create(:campaign)
      CampaignMembership.create(
        campaign: campaign2, user: @user, role: 'member'
      )

      get :index, { params: { user_id: @user.id } }

      expected_response = [
        { 'id' => @campaign.id, 'name' => @campaign.name },
        { 'id' => campaign2.id, 'name' => campaign2.name }
      ]
      expect(res_json['data']['campaigns']).to eq(expected_response)
    end

    it "returns an empty array if user belongs to no campaigns" do
      @user.campaign_memberships.first.delete

      get :index, { params: { user_id: @user.id } }
      expect(res_json['data']['campaigns']).to eq([])
    end

    it "fails with invalid user param" do
      get :index, { params: { user_id: 'i dont exist' } }
      res = res_json()
      expect(res['status']).to eq('fail')
    end
  end

  describe "create" do
    it "requires login" do
      controller.session[:user_id] = nil
      post :create
      expect(res_json['status']).to eq('fail')
      expect(res_json['data']['message']).to include("User must be logged in")
    end

    it "creates a new campaign with valid params" do
      post :create, {
        params: { campaign: { name: 'Test McTestFace' } }
      }
      res = res_json()
      expect(res['status']).to eq('success')

      created_campaign = Campaign.find_by name: 'Test McTestFace'
      expect(created_campaign).not_to be_nil()
    end

    it "adds a campaign membership with owner role" do
      post :create, {
        params: { campaign: { name: 'asdfasdfasdf' } }
      }

      expect(@user.campaigns.last).to eq(Campaign.last)
      expect(Campaign.last.users[0]).to eq(@user)
    end

    it "fails with invalid params" do
      post :create, {
        params: { campaign: { name: '' } }
      }
      res = res_json()
      expect(res['status']).to eq('fail')
      expect(res['data']['message']).to eq("Validation failed")
    end
  end
end
