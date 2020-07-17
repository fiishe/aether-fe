class Campaign < ApplicationRecord
  has_many :campaign_memberships
  has_many :users, through: :campaign_memberships
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'

  validates :name, :owner_id, :crystal, presence: true
  validates :name, length: { minimum: 2, maximum: 32 }, uniqueness: true
end
