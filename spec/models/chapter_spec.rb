require 'rails_helper'

RSpec.describe Chapter, type: :model do
  it { should validate_length_of(:name).is_at_least(2) }
  it { should validate_length_of(:name).is_at_most(48) }

  it { should belong_to(:map) }
end
