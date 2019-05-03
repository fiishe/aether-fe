class CreateCampaignMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :campaign_memberships do |t|
      t.integer :campaign_id
      t.integer :user_id
      t.string :role, default: "member"
      t.timestamps
    end
  end
end
