class User < ApplicationRecord
  validates :snowflake, presence: true, length: { minimum: 11, maximum: 13 }
  validates :discrim, length: { is: 4 }
  validates :nick, length: { minimum: 2, maximum: 16 }
end
