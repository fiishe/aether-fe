class AddOwnerReferenceToCampaigns < ActiveRecord::Migration[6.0]
  def change
    add_reference :campaigns, :owner,
      foreign_key: { to_table: :users }, index: true
  end
end
