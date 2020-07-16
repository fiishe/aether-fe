class User < ApplicationRecord
  has_many :campaign_memberships
  has_many :campaigns, through: :campaign_memberships

  has_many :characters
  has_many :maps, foreign_key: 'creator_id'

  validates :discriminator, length: { is: 4 }
  validates :nick, length: { minimum: 2, maximum: 16 }, allow_nil: true
  validates :bio, length: { maximum: 140 }, allow_nil: true
end
