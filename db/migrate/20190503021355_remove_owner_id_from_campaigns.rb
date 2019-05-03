class RemoveOwnerIdFromCampaigns < ActiveRecord::Migration[5.2]
  def change
    remove_column :campaigns, :owner_id, :integer
  end
end
