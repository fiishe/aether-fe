class ChangeInviteExpiryToDatetime < ActiveRecord::Migration[6.0]
  def change
    remove_column :invites, :expires_at, :time
    add_column :invites, :expires_at, :datetime, precision: 6
  end
end
