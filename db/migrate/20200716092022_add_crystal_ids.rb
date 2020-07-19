class AddCrystalIds < ActiveRecord::Migration[6.0]
  TABLES = [:campaigns, :characters, :maps]

  def up
    TABLES.each do |table|
      add_column table, :crystal, :bigint, null:false, default: 0
    end
  end

  def down
    TABLES.each do |table|
      remove_column table, :crystal, :bigint, null:false
    end
  end
end
