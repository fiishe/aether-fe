class Map < ApplicationRecord
  has_many :chapters
  has_one_attached :background

  validates :name, length: { minimum: 2, maximum: 32 }, uniqueness: true
  validates :image_url, length: { maximum: 2000 }

  validates :height, :width, numericality: {
    only_integer: true,
    greater_than_or_equal_to: 1,
    less_than_or_equal_to: 64
  }

  validates :tile_size, numericality: {
    only_integer: true,
    greater_than_or_equal_to: 16,
    less_than_or_equal_to: 128
  }

  def creator
    User.find(self.creator_id)
  end
end
