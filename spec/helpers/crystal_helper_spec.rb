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

EPOCH = Time.at(ENV['EPOCH'].to_i)

def current_time_ms # in ms
  (Time.now - EPOCH) * 1000.0
end

RSpec.describe CrystalHelper, type: :helper do
  describe :crystal_from_time do
    it "generates a crystal with the given time component (within 1s)" do
      start_time = Time.now
      id = helper.crystal_from_time start_time
      id_time = helper.extract_time id

      dt = start_time.to_f - id_time.to_f
      expect(dt.abs).to be < 1
    end

    it "generates different crystals when called twice with the same time" do
      time = Time.now
      id_1 = helper.crystal_from_time time
      id_2 = helper.crystal_from_time time

      expect(id_1).not_to eq(id_2)
    end
  end

  describe :generate_crystal do
    it "generates a crystal with an accurate time component (within 1s)" do
      # This is important so that crystal ids are sortable (by creation time)

      id = helper.generate_crystal
      id_time_ms = id >> 12 # time since epoch in ms

      dt = (id_time_ms - current_time_ms).to_i
      expect(dt.abs).to be < 1000
    end
  end

  describe :extract_time do
    it "returns the time at which the crystal was generated (within 1s)" do
      start_time = Time.now
      id = helper.generate_crystal
      id_time = helper.extract_time id  # Time at which crystal was created

      dt = start_time.to_f - id_time.to_f
      expect(dt.abs).to be < 1
    end
  end
end
