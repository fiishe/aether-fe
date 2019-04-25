require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:snowflake) {|n| "%012d" % [n]}
    username { "userguy" }
    sequence(:discriminator) {|n| "%04d" % [n]}
    nick { "The Guy" }
    access_token { SecureRandom.urlsafe_base64 }
  end
end