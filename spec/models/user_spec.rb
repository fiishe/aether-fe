require 'rails_helper'

RSpec.describe User, type: :model do
  subject { FactoryBot.create(:user) }

  describe "A User created by FactoryBot (see spec/support/factory_bot.rb)" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end
  end
end
