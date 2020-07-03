require "rails_helper"

DISCORD_API_ENDPOINT = "https://discordapp.com/api"
# DISCORD_CDN_ENDPOINT = "https://cdn.discordapp.com"
# REQUESTED_SCOPE = "identify"

RSpec.describe UsersController, type: :controller do
  @oauth_state = nil

  before :each do
    user = FactoryBot.create(:user)
    @id = user.id
  end

  describe "login" do
    it "redirects to discord oauth prompt" do
      get "login"
      res_uri = URI.parse(response.location)

      expect(res_uri.host).to eq("discordapp.com")
      expect(res_uri.path).to eq("/api/oauth2/authorize")
    end

    it "redirects with the right params" do
      get "login"
      res_uri = URI.parse(response.location)

      client_id = ENV['DISCORD_CLIENT_ID']

      redirect_params = Rack::Utils.parse_query(res_uri.query)
      expect(redirect_params['client_id']).to eq(client_id)
      expect(redirect_params['state']).not_to be_nil()

      @oauth_state = redirect_params[:state]
    end
  end

  describe "callback" do

  end
end
