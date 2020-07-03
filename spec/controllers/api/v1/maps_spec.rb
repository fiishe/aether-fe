require "rails_helper"

RSpec.describe Api::V1::MapsController, type: :controller do
  describe "create" do
    before :each do
      user = FactoryBot.create(:user)
      login(user)
    end

    it "creates a new map with valid params" do
      post "create",
        params: {
          name: 'Mappy',
          width: 2, height: 2,
          grid_alpha: 100, grid_color: '#ff0000',
          tile_size: 32, tile_data: "[0, 0, 1, 0]"
        }

      res_json = JSON.parse(response.body)
      expect(res_json['status']).to eq('success')

      created_map = Map.find_by name: 'Mappy'
      expect(created_map).not_to be_nil()
    end

    it "returns error messages with invalid params" do
      post "create",
        params: {
          name: 'Mappy',
          width: 1000, height: -2,
          tile_size: 32
        }

        res_json = JSON.parse(response.body)
        expect(res_json['status']).to eq('fail')

        expect(res_json['data']['message']).to eq("Validation failed")

        expected_errors = [
          "Height must be greater than or equal to 1",
          "Width must be less than or equal to 64",
          "Grid alpha is not a number",
          "Grid color must be a valid hex color code"
        ]
        expect(res_json['data']['errors']).to eq(expected_errors)
    end
  end
end
