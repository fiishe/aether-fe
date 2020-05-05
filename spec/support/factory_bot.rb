require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:snowflake) {|n| "%012d" % [n]}
    username { "userguy" }
    sequence(:discriminator) {|n| "%04d" % [n]}
    nick { "The Guy" }
    avatar_url { "http://example.com/img.jpg" }
    access_token { SecureRandom.urlsafe_base64 }
  end

  factory :campaign do
    name { "The Hobbit" }
  end

  factory :character do
    name { "Tim" }
    user { create(:user) }
  end
end
