class User < ApplicationRecord
  has_many :campaign_memberships
  has_many :campaigns, through: :campaign_memberships

  validates :discriminator, length: { is: 4 }
  validates :nick, length: { minimum: 2, maximum: 16 }, allow_nil: true

  def owned_campaigns
    # includes(:campaigns) eager-loads the campaigns model to reduce queries
    self.campaign_memberships.where(role: "owner").includes(:campaign).map do |campaign_membership|
      campaign_membership.campaign
    end
  end
end
