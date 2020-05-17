class Chapter < ApplicationRecord
  belongs_to :map

  validates :title, length: { minimum: 2, maximum: 48 }, uniqueness: true
end
