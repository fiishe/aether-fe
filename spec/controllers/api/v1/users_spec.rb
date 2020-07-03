require "rails_helper"

RSpec.describe "Users API -", type: :request do
  before :each do
    user = FactoryBot.create(:user)
    @id = user.id
  end

  describe "GET /api/v1/users/:id" do
    it "returns user data given id param" do
      res = get_json("/api/v1/users/#{@id}")
      expect(res).to eq(
        {
          "id" => @id,
          "username" => "userguy",
          "nick" => "The Guy",
          "discriminator" => "0001",
          "avatar_url" => "http://example.com/img.jpg",
          "bio" => nil
        }
      )
    end
  end

  describe "GET /api/v1/users/me" do
    it "returns data for a logged-in user" do
      get "/dev/login/#{@id}"
      res = get_json("/api/v1/users/me")
      expect(res['id']).to eq(@id)
    end

    it "returns error message if user is not logged in" do
      res = get_json("/api/v1/users/me")
      expect(res['status']).to eq('fail')
    end
  end
end
