class CampaignMembership < ApplicationRecord
  belongs_to :user
  belongs_to :campaign

  validates :role, inclusion: { in: ["member", "admin", "owner"] }
end
