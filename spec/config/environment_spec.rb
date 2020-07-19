require "rails_helper"

RSpec.describe "Environment variable" do
  expected_vars = [
    'DISCORD_CLIENT_ID',
    'DISCORD_CLIENT_SECRET',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'EPOCH'
  ]

  expected_vars.each do |key|
    it "#{key} exists" do
      value = ENV[key]
      expect(value).not_to be_nil()
    end
  end
end
