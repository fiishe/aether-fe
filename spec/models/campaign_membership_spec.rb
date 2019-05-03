require 'rails_helper'

RSpec.describe CampaignMembership, type: :model do
  it { should validate_inclusion_of(:role).in_array(["member", "admin", "owner"]) }
end
