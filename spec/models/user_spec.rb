require 'rails_helper'

RSpec.describe User, type: :model do
  subject { FactoryBot.create(:user) }

  describe "A User created by FactoryBot (spec/support/factory_bot.rb)" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end

    it "is invalid with a discriminator of the wrong length" do
      subject.discriminator = "123"
      expect(subject).to_not be_valid
    end

    it "is valid with no nickname" do
      subject.nick = nil
      expect(subject).to be_valid
    end

    it "is invalid with a nick that is too short" do
      subject.nick = "a"
      expect(subject).to_not be_valid
    end

    it "is invalid with a nick that is too long" do
      subject.nick = "0123456789abcdefggggg oof oof oof oof oof"
      expect(subject).to_not be_valid
    end
  end

  describe "associations: " do
    it { should have_many(:campaigns).through(:campaign_memberships) }
  end
end
