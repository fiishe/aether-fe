require 'rails_helper'

# Specs in this file have access to a helper object that includes
# the CampaignAuthHelper. For example:
#
# describe CampaignAuthHelper do
#   describe "string concat" do
#     it "concats two strings with spaces" do
#       expect(helper.concat_strings("this","that")).to eq("this that")
#     end
#   end
# end

RSpec.describe CampaignAuthHelper, type: :helper do
  before :all do
    @campaign = FactoryBot.create(:campaign)
    @owner = @campaign.owner
    CampaignMembership.create(
      { campaign: @campaign, user: @owner, role: 'owner' }
    )

    @admin = FactoryBot.create(:user)
    CampaignMembership.create(
      { campaign: @campaign, user: @admin, role: 'admin' }
    )

    @member = FactoryBot.create(:user)
    CampaignMembership.create(
      { campaign: @campaign, user: @member, role: 'member' }
    )

    @non_member = FactoryBot.create(:user)
  end

  describe "require_campaign_membership" do
    it "passes if current_user belongs to the campaign" do

    end

    it "fails if current_user does not belong to the campaign" do

    end
  end

  describe "require_campaign_admin" do
    it "passes if current_user is an admin" do

    end

    it "passes if current_user is an owner" do

    end

    it "fails if current_user is a member" do

    end

    it "fails if current_user does not belong to the campaign" do

    end
  end

  describe "require_campaign_owner" do
    it "passes if current_user is an owner" do

    end

    it "fails if current_user is not an owner" do

    end

    it "fails if current_user does not belong to the campaign" do

    end
  end
end
