require 'rails_helper'

RSpec.describe Chapter, type: :model do
  subject { FactoryBot.create(:chapter) }
  
  it { should validate_length_of(:title).is_at_least(2) }
  it { should validate_length_of(:title).is_at_most(48) }
  it { should validate_uniqueness_of(:title) }

  it { should belong_to(:map) }
end
