require 'rails_helper'

RSpec.describe Campaign, type: :model do
  # create a record so shoulda can test uniqueness validation
  subject { FactoryBot.create(:campaign) }

  it { should validate_length_of(:name).is_at_least(2) }
  it { should validate_length_of(:name).is_at_most(32) }
  it { should validate_uniqueness_of(:name) }

  it { should have_many(:users).through(:campaign_memberships) }
end
