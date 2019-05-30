class UserShowSerializer < ActiveModel::Serializer
  attributes :id, :username, :discriminator, :nick, :avatar_url, :bio
end
