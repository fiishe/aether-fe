class AddLimitedUsesToInvites < ActiveRecord::Migration[6.0]
  def change
    add_column :invites, :uses, :integer
  end
end
