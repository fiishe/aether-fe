class CampaignIndexSerializer < ActiveModel::Serializer
  attributes :id, :name, :owner

  def owner
    object.user
  end
end
