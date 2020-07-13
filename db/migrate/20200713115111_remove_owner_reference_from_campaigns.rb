class RemoveOwnerReferenceFromCampaigns < ActiveRecord::Migration[6.0]
  def change
    remove_reference :campaigns, :owner,
      foreign_key: { to_table: :users }, index: true, null: false
  end
end
