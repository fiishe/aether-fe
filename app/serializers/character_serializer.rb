class CharacterSerializer < ActiveModel::Serializer
  attribute :crystal, key: :id
  attributes :name, :class_name, :level, :promoted, :campaign

  def campaign
    object.campaign.as_json(only: [:id, :name])
  end
end
