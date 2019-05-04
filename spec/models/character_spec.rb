require 'rails_helper'

RSpec.describe Character, type: :model do
  subject { FactoryBot.create(:character) }

  it { should validate_length_of(:name).is_at_least(2) }
  it { should validate_length_of(:name).is_at_most(16) }
  it { should validate_uniqueness_of(:name).scoped_to(:user_id) }

  it { should validate_numericality_of(:level).only_integer }
  it { should validate_numericality_of(:level).is_greater_than_or_equal_to(1) }
  it { should validate_numericality_of(:level).is_less_than_or_equal_to(20) }
end
