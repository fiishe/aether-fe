class AddGridStyleToMaps < ActiveRecord::Migration[5.2]
  def change
    add_column :maps, :grid_alpha, :integer
    add_column :maps, :grid_color, :string
    remove_column :maps, :image_url, :string
  end
end
