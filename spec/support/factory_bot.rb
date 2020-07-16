require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:snowflake) {|n| "%012d" % [n]}
    username { "userguy" }
    sequence(:discriminator) {"0001"}
    nick { "The Guy" }
    avatar_url { "http://example.com/img.jpg" }
    access_token { SecureRandom.urlsafe_base64 }
  end

  factory :character do
    name { "Tim" }
    user { create(:user) }
  end

  factory :campaign do
    sequence(:name) { |n| "Shrek #{n}" }
    owner { create(:user) }
  end

  factory :map do
    name { "Plain Plains" }
    user { create(:user) }
    height { 6 }
    width { 8 }
    tile_size { 64 }
    tile_data { "[
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
      ]" }
    grid_alpha { 100 }
    grid_color { "#0000ff" }
  end

  factory :chapter do
    title { "In Which Nothing Happens" }
    map { create(:map) }
  end
end
