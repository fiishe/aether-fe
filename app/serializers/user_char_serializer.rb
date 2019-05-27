class UserCharSerializer < ActiveModel::Serializer
  has_many :characters, serializer: CharacterShowSerializer
end
