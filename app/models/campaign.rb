class Campaign < ApplicationRecord
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  has_many :campaign_memberships
  has_many :users, through: :campaign_memberships

  validates :name, length: { minimum: 2, maximum: 32 }, uniqueness: true

  def user
    owner
  end
end
