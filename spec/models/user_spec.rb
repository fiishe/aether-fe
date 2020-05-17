require 'rails_helper'

RSpec.describe User, type: :model do
  describe "A User created by FactoryBot" do
    it "is valid" do
      user = FactoryBot.create(:user)
      expect(user).to be_valid
    end
  end

  it { should validate_length_of(:discriminator).is_equal_to(4) }

  it { should validate_length_of(:nick).is_at_least(2).allow_nil }
  it { should validate_length_of(:nick).is_at_most(16).allow_nil }

  it { should have_many(:campaigns).through(:campaign_memberships) }
end
