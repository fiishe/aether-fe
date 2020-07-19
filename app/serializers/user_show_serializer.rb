class UserShowSerializer < ActiveModel::Serializer
  attribute :snowflake, key: :id
  attributes :username, :discriminator, :nick, :avatar_url, :bio
end
