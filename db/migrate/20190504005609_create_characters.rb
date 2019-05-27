class CreateCharacters < ActiveRecord::Migration[5.2]
  def change
    create_table :characters do |t|
      t.string :name, null: false
      t.string :class, null: false
      t.integer :level, null: false, default: 1
      t.boolean :promoted, null: false, default: false

      t.integer :user_id, null: false
      t.integer :campaign_id
      t.timestamps
    end
  end
end
