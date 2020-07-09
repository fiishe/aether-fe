require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :controller do
  before :each do
    @user = FactoryBot.create(:user)
  end

  describe "show" do
    it "returns user data given id param" do
      get :show, params: { id: @user.id }
      res = res_json()
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

        get :show, params: { id: "me" }
        res = res_json()
        expect(res['id']).to eq(@user.id)
        expect(res['username']).to eq(@user.username)
      end

      it "fails if user is not logged in" do
        get :show, params: { id: "me" }
        res = res_json()
        expect(res['status']).to eq('fail')
      end
    end
  end

  describe "update" do
    it "updates user data" do
      login(@user)

      patch :update, params: { id: "me", user: { nick: "aaa", bio: "bbb" } }

      updated_user = User.find(@user.id)
      expect(updated_user.nick).to eq("aaa")
      expect(updated_user.bio).to eq("bbb")
    end

    it "returns the updated user data" do
      login(@user)

      patch :update, params: { id: "me", user: { nick: "aaa", bio: "bbb" } }
      res = JSON.parse(response.body)

      expect(res['data']['user']['nick']).to eq("aaa")
      expect(res['data']['user']['bio']).to eq("bbb")
    end

    it "fails with invalid data" do
      login(@user)

      patch :update, params: { id: "me", user: { nick: " " } }
      res = JSON.parse(response.body)
      expect(res['status']).to eq('fail')
    end

    it "fails if user is not logged in" do
      patch :update, params: { id: "me", user: { nick: "aaaa" } }
      res = JSON.parse(response.body)
      expect(res['status']).to eq('fail')
    end
  end
  #
end
