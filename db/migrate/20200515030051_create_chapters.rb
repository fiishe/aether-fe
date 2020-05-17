class CreateChapters < ActiveRecord::Migration[5.2]
  def change
    create_table :chapters do |t|
      t.string "title", null:false
      t.integer "map_id", null:false
      t.timestamps
    end
  end
end
