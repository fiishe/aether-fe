require 'rails_helper'

RSpec.describe Invite, type: :model do
  it { should belong_to(:campaign) }

  it { should validate_length_of(:token).is_equal_to(8) }
  it { should validate_uniqueness_of(:token).case_insensitive }
end
