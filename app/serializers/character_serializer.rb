class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :class_name, :level, :promoted, :campaign

  def campaign
    object.campaign.as_json(only: [:id, :name])
  end
end
