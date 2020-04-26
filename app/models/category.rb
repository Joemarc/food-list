class Category < ApplicationRecord
  has_many :product_names
  has_many :products
end
