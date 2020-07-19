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
    sequence(:name) { |n| "Tim #{n}" }
    user { create(:user) }
    sequence(:crystal) { |n| 1_000 + n }
  end

  factory :campaign do
    sequence(:name) { |n| "Shrek #{n}" }
    owner { create(:user) }
    sequence(:crystal) { |n| 10_000 + n }
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
    sequence(:crystal) { |n| 100_000 + n }
  end

  factory :chapter do
    title { "In Which Nothing Happens" }
    map { create(:map) }
  end
end
