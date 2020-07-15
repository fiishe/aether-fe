class CampaignSerializer < ActiveModel::Serializer
  attributes :id, :name, :users

  def users
    object.campaign_memberships.includes(:user).map do |membership|
      user_obj = UserSerializer.new(membership.user).as_json
      user_obj['role'] = membership.role
      user_obj
    end
  end
end
