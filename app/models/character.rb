class Character < ApplicationRecord
  belongs_to :user
  belongs_to :campaign, optional: true

  validates :name, length: { minimum: 2, maximum: 16 }
  validates :name, uniqueness: { scope: :user_id }
  validates :level, numericality: {
    only_integer: true,
    greater_than_or_equal_to: 1,
    less_than_or_equal_to: 20
  }
end
