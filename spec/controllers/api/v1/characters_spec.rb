require "rails_helper"

RSpec.describe Api::V1::CharactersController, type: :controller do
  before :each do
    @character = FactoryBot.create(:character)
    @user = @character.user
    login @user
  end

  describe "index" do
    it "lists characters belonging to a user" do
      char2 = FactoryBot.create(:character)
      char2.user = @user
      char2.save

      get :index, params: { user_id: @user.snowflake }
      res = res_json()

      expect(res[0]).to include(
        'id' => @character.crystal,
        'name' => @character.name,
      )
      expect(res[0]).to include('level', 'class_name', 'promoted')
      expect(res[0]).not_to include('id' => @character.id)

      expect(res[1]).not_to be_nil()
    end
  end

  describe "show" do
    it "returns a character" do
      get :show, params: { id: @character.crystal }
      res = res_json()

      expect(res).to include(
        'id' => @character.crystal,
        'name' => @character.name
      )
      expect(res).to include('level', 'promoted', 'stats')
    end
  end
end
