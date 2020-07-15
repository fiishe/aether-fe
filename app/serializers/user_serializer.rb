class UserSerializer < ActiveModel::Serializer
  attributes :nick, :username, :avatar_url
end
