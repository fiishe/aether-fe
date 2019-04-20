require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:snowflake) {|n| "%012d" % [n]}
    username { "userguy" }
    sequence(:discrim) {|n| "%04d" % [n]}
    nick { "The Guy" }
  end
end
