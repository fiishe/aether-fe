class UserSerializer < ActiveModel::Serializer
  attribute :snowflake, key: :id
  attributes :nick, :username, :avatar_url
end
