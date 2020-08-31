require "rails_helper"

RSpec.describe InvitesController, type: :controller do
  before :all do
    @user = FactoryBot.create(:user)
    @invite = FactoryBot.create(:invite)
    @campaign = @invite.campaign
  end

  before :each do
    # clear CampaignMemberships
    CampaignMembership.where(user: @user).delete_all
  end

  context "with rendered views" do
    render_views

    describe "GET show" do
      it "displays the campaign info if invite is valid" do
        get :show, params: { id: @invite.token }

        expect(response.body).to include(@invite.campaign.name)
      end

      it "displays error message if no invite with given token exists" do
        get :show, params: { id: "asdfasdfasdf" }

        expect(response.body).to include("invalid invite")
      end

      it "displays error message if invite is expired" do
        @invite.expires_at = DateTime.now - 1.days
        @invite.save

        get :show, params: { id: @invite.token }

        expect(response.body).to include("invalid invite")

        @invite.expires_at = nil
        @invite.save
      end

      it "displays error message if invite is out of uses" do
        @invite.uses = 0
        @invite.save

        get :show, params: { id: @invite.token }
        expect(response.body).to include("invalid invite")
      end
    end
  end

  describe "GET join" do
    it "redirects to the invite page if not logged in" do
      get :join, params: { id: @invite.token }

      expect(response).to redirect_to("/invite/#{@invite.token}")
    end

    it "redirects to the campaign page if logged in" do
      login @user
      get :join, params: { id: @invite.token }

      expect(response).to redirect_to("/campaigns/#{@campaign.crystal}")
    end

    describe "where user does not already belong to campaign" do
      it "creates a campaign membership" do
        login @user
        get :join, params: { id: @invite.token }

        cm = CampaignMembership.find_by(user: @user, campaign: @campaign)
        expect(cm).not_to be_nil()
      end

      it "reduces the invite use count by 1" do
        @invite.uses = 5
        @invite.save

        login @user
        get :join, params: { id: @invite.token }
        expect(Invite.find(@invite.id).uses).to eq(4)
      end
    end

    describe "where user already belongs to the campaign" do
      it "does not create a campaign membership" do
        login @user
        CampaignMembership.create(user: @user, campaign: @campaign)
        get :join, params: { id: @invite.token }

        cms = CampaignMembership.where(user: @user, campaign: @campaign)
        expect(cms.length).to eq(1)
      end

      it "does not reduce the invite use count" do
        @invite.uses = 4
        @invite.save

        login @user
        CampaignMembership.create(user: @user, campaign: @campaign)
        get :join, params: { id: @invite.token }

        expect(Invite.find(@invite.id).uses).to eq(4)
      end
    end
  end
end
