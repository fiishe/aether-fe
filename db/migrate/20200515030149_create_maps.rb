class CreateMaps < ActiveRecord::Migration[5.2]
  def change
    create_table :maps do |t|
      t.string "name", null:false
      t.integer "creator_id", null:false
      t.string "image_url", null:false
      t.integer "height", null:false
      t.integer "width", null:false
      t.integer "tile_size", null:false
      t.json "tile_data", null:false
      t.timestamps
    end
  end
end
