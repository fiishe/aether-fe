class CreateInvites < ActiveRecord::Migration[6.0]
  def change
    create_table :invites do |t|
      t.string :token, limit: 8
      t.bigint :campaign_id
      t.time :expires_at
      t.timestamps
    end
  end
end
