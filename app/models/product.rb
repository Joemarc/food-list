class Product < ApplicationRecord
  has_many :lists
  has_one :category

  enum status: { in: 0, out: 1 }
end
