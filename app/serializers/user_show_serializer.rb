class UserShowSerializer < ActiveModel::Serializer
  attributes :id, :username, :nick, :avatar_url, :bio
end
