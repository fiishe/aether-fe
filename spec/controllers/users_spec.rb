require "rails_helper"

RSpec.describe UsersController, type: :controller do
  @oauth_state = nil

  DISCORD_API_ENDPOINT = "https://discordapp.com/api"
  REQUESTED_SCOPE = "identify"

  before :each do
    @user = FactoryBot.create(:user)
  end

  describe "login" do
    it "redirects to discord oauth prompt" do
      get :login
      res_uri = URI.parse(response.location)

      expect(res_uri.host).to eq("discordapp.com")
      expect(res_uri.path).to eq("/api/oauth2/authorize")
    end

    it "redirects with the right params" do
      get :login
      res_uri = URI.parse(response.location)

      client_id = ENV['DISCORD_CLIENT_ID']

      redirect_params = Rack::Utils.parse_query(res_uri.query)
      expect(redirect_params['client_id']).to eq(client_id)
      expect(redirect_params['state']).not_to be_nil()

      @oauth_state = redirect_params[:state]
    end
  end

  describe "callback" do
    before :each do
      discord_access_token = "aaaa"
      discord_refresh_token = "bbbb"
      discord_avatar_hash = "cccc"

      @token_response = {
        access_token: discord_access_token,
        token_type: "Bearer",
        expires_in: 604800,
        refresh_token: discord_refresh_token,
        scope: REQUESTED_SCOPE
      }
      stub_request(:post, DISCORD_API_ENDPOINT + "/oauth2/token").to_return(
        status: 200,
        body: @token_response.to_json
      )

      @user_response = {
        id: @user.snowflake,
        username: @user.username,
        discriminator: @user.discriminator,
        avatar: discord_avatar_hash
      }
      stub_request(:get, DISCORD_API_ENDPOINT + "/users/@me").to_return(
        status: 200,
        body: @user_response.to_json
      )

      # set sample state in session (this would be done in the login action)
      @state = "asdf"
      controller.session[:auth_state] = {
        "value" => @state,
        "expires_in" => 1.minute,
        "secure" => true
      }
    end

    it "fails without a state var" do
      get :callback
      res = JSON.parse(response.body)
      expect(res['status']).to eq('fail')
    end

    it "fails with an incorrect state var" do
      get :callback, params: { state: "i don't exist" }
      res = JSON.parse(response.body)
      expect(res['status']).to eq('fail')
    end

    it "logs the User in if it already exists" do
      get :callback, params: { state: @state }
      expect(controller.session[:user_id]).to eq(@user.id)
    end

    it "creates a new User if the snowflake is unique" do
      @user_response[:id] = "this is a new snowflake"
      stub_request(:get, DISCORD_API_ENDPOINT + "/users/@me").to_return(
        status: 200,
        body: @user_response.to_json
      )
      get :callback, params: { state: @state }
      expect(User.last.id).not_to eq(@user.id)
    end
  end
end
