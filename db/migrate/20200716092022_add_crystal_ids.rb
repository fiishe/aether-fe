class AddCrystalIds < ActiveRecord::Migration[6.0]
  tables = [:campaigns, :characters, :maps]

  def up
    tables.each do |table|
      add_column table, :crystal, :bigint, null:false, default: 0
    end
  end

  def down
    tables.each do |table|
      remove_column table, :crystal, :bigint, null:false
    end
  end
end
