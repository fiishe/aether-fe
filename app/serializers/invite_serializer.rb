class InviteSerializer < ActiveModel::Serializer
  attributes :token, :expires_at, :uses
end
