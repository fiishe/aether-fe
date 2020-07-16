class MakeOwnerRefNotNull < ActiveRecord::Migration[6.0]
  def up
    change_column_null :campaigns, :owner_id, :false, 1
  end

  def down
    change_column_null :campaigns, :owner_id, :true
  end
end
