class CampaignSerializer < ActiveModel::Serializer
  attributes :id, :name, :users

  has_many :users, through: :campaign_memberships
end
