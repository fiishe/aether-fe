class UserShowSerializer < ActiveModel::Serializer
  attributes :id, :username, :nick, :avatar_url, :bio

  has_many :characters, serializer: CharacterShowSerializer
end
