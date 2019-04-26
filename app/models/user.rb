class User < ApplicationRecord
  has_many :campaigns, foreign_key: :owner_id
  has_many :campaign_memberships
  has_many :campaigns, through: :campaign_memberships

  validates :discriminator, length: { is: 4 }
  validates :nick, length: { minimum: 2, maximum: 16 }, allow_nil: true
end
