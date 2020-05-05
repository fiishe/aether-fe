class AddStatsToCharacters < ActiveRecord::Migration[5.2]
  def change
    remove_column :characters, :class, :string # because class is reserved
    add_column :characters, :class_name, :string

    [:max_hp, :strength, :magic, :skill, :speed, :luck, :defense, :resistance].each do |stat|
      add_column :characters, stat, :integer, null: false, default: 0
    end
  end
end
