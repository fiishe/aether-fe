require "rails_helper"

RSpec.describe Api::V1::CampaignsController, type: :controller do
  before :each do
    @campaign = FactoryBot.create(:campaign)
    login(@campaign.owner)
  end

  describe "index" do
    it "lists campaigns a user is in" do
      user = @campaign.owner
      CampaignMembership.create(
        campaign: @campaign, user: user, role: 'owner'
      )
      campaign2 = FactoryBot.create(:campaign)
      CampaignMembership.create(
        campaign: campaign2, user: user, role: 'member'
      )

      get :index, { params: { user_id: user.id } }
      res = res_json()

      expect(res[0]['id']).to eq(@campaign.id)
      expect(res[0]['name']).to eq(@campaign.name)
      expect(res[1]['id']).to eq(campaign2.id)
    end

    it "fails with invalid user param" do
      get :index, { params: { user_id: 'no' } }
      res = res_json()
      expect(res['status']).to eq('fail')
    end
  end

  describe "create" do
    it "creates a new campaign with valid params" do
      post :create, {
        params: { name: 'Test McTestFace' }
      }
      res = res_json()
      expect(res['status']).to eq('success')

      created_campaign = Campaign.find_by name: 'Test McTestFace'
      expect(created_campaign).not_to be_nil()
    end

    it "returns error messages with invalid params" do
      post :create, {
        params: { name: "" }
      }
      res = res_json()
      expect(res['status']).to eq('fail')
      expect(res['data']['message']).to eq("Validation failed")
    end
  end
end
