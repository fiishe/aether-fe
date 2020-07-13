class Campaign < ApplicationRecord
  has_many :campaign_memberships
  has_many :users, through: :campaign_memberships

  validates :name, length: { minimum: 2, maximum: 32 }, uniqueness: true
end
