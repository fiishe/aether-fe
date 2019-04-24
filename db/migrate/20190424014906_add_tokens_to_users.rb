class AddTokensToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :access_token, :string
    add_column :users, :access_token_issued, :datetime
    add_column :users, :refresh_token, :string
    add_column :users, :avatar_url, :string
    rename_column :users, :discrim, :discriminator
  end
end
