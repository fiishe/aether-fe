class UserSerializer < ActiveModel::Serializer
  attributes :id, :nick, :username, :avatar_url
end
