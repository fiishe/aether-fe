require "rails_helper"

RSpec.describe Api::V1::CampaignsController, type: :controller do
  before :each do
    @campaign = FactoryBot.create(:campaign)
  end
end
