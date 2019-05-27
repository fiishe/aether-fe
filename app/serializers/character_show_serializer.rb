class CharacterShowSerializer < ActiveModel::Serializer
  attributes :name, :level, :promoted, :campaign_id
end
