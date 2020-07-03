require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :controller do
  before :each do
    @user = FactoryBot.create(:user)
  end

  describe "show" do
    it "returns user data given id param" do
      res = get_json "show", params: { id: @user.id }
      expect(res).to eq(
        {
          "id" => @user.id,
          "username" => "userguy",
          "nick" => "The Guy",
          "discriminator" => "0001",
          "avatar_url" => "http://example.com/img.jpg",
          "bio" => nil
        }
      )
    end

    describe "with \"me\" param" do
      it "returns data of currently logged in user" do
        login(@user)

        res = get_json "show", params: { id: "me" }
        expect(res['id']).to eq(@user.id)
        expect(res['username']).to eq(@user.username)
      end

      it "returns error if user is not logged in" do
        res = get_json "show", params: { id: "me" }
        expect(res['status']).to eq('fail')
      end
    end
  end
  #
end
