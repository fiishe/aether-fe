require 'rails_helper'

RSpec.describe Map, type: :model do
  it { should validate_length_of(:name).is_at_least(2) }
  it { should validate_length_of(:name).is_at_most(32) }

  it { should validate_length_of(:image_url).is_at_most(2000) }

  [:height, :width].each do |size|
    it { should validate_numericality_of(size).only_integer }
    it { should validate_numericality_of(size).is_greater_than_or_equal_to(1) }
    it { should validate_numericality_of(size).is_less_than_or_equal_to(64) }
  end

  it { should validate_numericality_of(:tile_size).is_greater_than_or_equal_to(16) }
  it { should validate_numericality_of(:tile_size).is_less_than_or_equal_to(64) }

  it { should have_many(:chapters) }
end
