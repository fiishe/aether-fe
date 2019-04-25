class User < ApplicationRecord
  validates :discriminator, length: { is: 4 }
  validates :nick, length: { minimum: 2, maximum: 16 }, allow_nil: true
end
