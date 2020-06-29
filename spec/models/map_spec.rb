require 'rails_helper'

RSpec.describe Map, type: :model do
  subject { FactoryBot.create(:map) }

  it { should validate_length_of(:name).is_at_least(2) }
  it { should validate_length_of(:name).is_at_most(32) }
  it { should validate_uniqueness_of(:name) }

  [:height, :width].each do |size|
    it { should validate_numericality_of(size).only_integer }
    it { should validate_numericality_of(size).is_greater_than_or_equal_to(1) }
    it { should validate_numericality_of(size).is_less_than_or_equal_to(64) }
  end

  it { should validate_numericality_of(:tile_size).only_integer }
  it { should validate_numericality_of(:tile_size).is_greater_than_or_equal_to(16) }
  it { should validate_numericality_of(:tile_size).is_less_than_or_equal_to(128) }

  it { should validate_numericality_of(:grid_alpha).only_integer }
  it { should validate_numericality_of(:grid_alpha).is_greater_than_or_equal_to(0) }
  it { should validate_numericality_of(:grid_alpha).is_less_than_or_equal_to(100) }

  it { should allow_values('#ff0000', "#000", "#beefed").for(:grid_color) }
  it { should_not allow_values('bruh', 'yeet', 'pog', '#1234567').for(:grid_color) }

end
