class RemoveDefaultFromCrystals < ActiveRecord::Migration[6.0]
  TABLES = [:campaigns, :characters, :maps]

  def up
    TABLES.each do |t|
      change_column_default t, :crystal, nil
    end
  end

  def down
    TABLES.each do |t|
      change_column_default t, :crystal, 0
    end
  end
end
