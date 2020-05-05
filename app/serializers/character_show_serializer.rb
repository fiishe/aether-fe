class CharacterShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :class_name, :level, :promoted, :stats
  
  def stats
    object.as_json(only: [:max_hp, :strength, :magic, :skill, :speed, :luck, :defense, :resistance])
  end
end
