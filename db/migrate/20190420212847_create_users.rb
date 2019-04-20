class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :snowflake, null: false
      t.string :username, null: false
      t.string :discrim, null: false
      t.string :nick
      t.timestamps
    end
  end
end
