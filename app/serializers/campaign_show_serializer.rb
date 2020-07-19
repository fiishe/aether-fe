class CampaignShowSerializer < ActiveModel::Serializer
  attribute :crystal, key: :id
  attributes :name, :owner, :users
end
