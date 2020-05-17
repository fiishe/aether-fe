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
    name { "The Hobbit" }
  end

  factory :map do
    name { "Plains" }
    creator_id { 1 }
    image_url { "http://placekitten.com/256/192" }
    height { 6 }
    width { 8 }
    tile_size { 64 }
    tile_data { "{ [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
      ] }" }
  end

  factory :chapter do
    title { "In Which Nothing Happens" }
    map { create(:map) }
  end
end
