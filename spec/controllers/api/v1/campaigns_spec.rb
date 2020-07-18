require "rails_helper"

RSpec.describe Api::V1::CampaignsController, type: :controller do
  before :each do
    @campaign = FactoryBot.create(:campaign)
    @user = @campaign.owner
    CampaignMembership.create(
      { campaign: @campaign, user: @user, role: 'owner' }
    )
    login(@user)
  end

  describe "index" do
    it "lists campaigns a user is in" do
      campaign2 = FactoryBot.create(:campaign)
      CampaignMembership.create(
        campaign: campaign2, user: @user, role: 'member'
      )
      get :index, params: { user_id: @user.snowflake }
      res = res_json()

      expect(res[0]).to include(
        'id' => @campaign.crystal,
        'name' => @campaign.name
      )

      expect(res[0]).to have_key('owner')
      expect(res[0]['owner']).to include(
        'id' => @user.snowflake,
        'nick' => @user.nick,
        'username' => @user.username,
        'avatar_url' => @user.avatar_url
      )

      expect(res[1]).not_to be_nil()
    end

    it "lists members of the campaigns with their roles" do
      get :index, params: { user_id: @user.snowflake }
      res = res_json()

      expect(res[0]).to have_key('users')
      expect(res[0]['users'][0]).not_to be_nil()
      expect(res[0]['users'][0]).to include(
        'id' => @user.snowflake,
        'role' => 'owner'
      )
    end

    it "returns an empty array if user belongs to no campaigns" do
      @user.campaign_memberships.first.delete

      get :index, params: { user_id: @user.snowflake }
      expect(res_json).to eq([])
    end

    it "fails with invalid user param" do
      get :index, params: { user_id: 'i dont exist' }
      res = res_json()
      expect(res['status']).to eq('fail')
    end
  end

  describe "create" do
    it "requires login" do
      logout()
      post :create
      res = res_json()
      expect(res).to include( 'status' => 'fail' )
      expect(res['data']['message']).to include("User must be logged in")
    end

    it "creates a new campaign with valid params" do
      post :create,
        params: { campaign: { name: 'Test McTestFace' } }

      res = res_json()
      expect(res['status']).to eq('success')

      created_campaign = Campaign.find_by name: 'Test McTestFace'
      expect(created_campaign).not_to be_nil()
    end

    it "sets the owner id and adds a campaign membership" do
      post :create, params: { campaign: { name: 'asdfasdfasdf' } }

      created_campaign = Campaign.last

      expect(created_campaign.owner).to eq(@user)
      expect(created_campaign.users[0]).to eq(@user)
      expect(@user.campaigns.last).to eq(Campaign.last)
      expect(@user.campaign_memberships.last.role).to eq('owner')
    end

    it "fails with invalid params" do
      post :create, params: { campaign: { name: '' } }

      res = res_json()
      expect(res['status']).to eq('fail')
      expect(res['data']['message']).to eq("Validation failed")
    end
  end
end
