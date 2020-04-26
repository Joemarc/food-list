class ProductName < ApplicationRecord
  has_many :products
  has_one :category
end
