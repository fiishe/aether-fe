class Map < ApplicationRecord
  include Rails.application.routes.url_helpers

  belongs_to :user, foreign_key: :creator_id
  has_many :chapters
  has_one_attached :background_image # image (see ActiveStorage docs)

  validates :crystal, presence: true
  
  validates :name, length: { minimum: 2, maximum: 32 }
  validates :name, uniqueness: true

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

  validates :grid_alpha, numericality: {
    only_integer: true,
    greater_than_or_equal_to: 0,
    less_than_or_equal_to: 100
  }
  validates :grid_color, format: {
    with: /\A#(?:[0-9a-fA-F]{3}){1,2}\z/,
    message: "must be a valid hex color code"
  }

  def creator
    user
  end
end
