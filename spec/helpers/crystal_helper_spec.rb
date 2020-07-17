require 'rails_helper'

# Specs in this file have access to a helper object that includes
# the CrystalHelper. For example:
#
# describe CrystalHelper do
#   describe "string concat" do
#     it "concats two strings with spaces" do
#       expect(helper.concat_strings("this","that")).to eq("this that")
#     end
#   end
# end

RSpec.describe CrystalHelper, type: :helper do
  describe "generate_snowflake" do
    id = helper.generate_id

    it "generates a number within 1 second of the time since EPOCH" do
      binding.pry
    end
  end
end
