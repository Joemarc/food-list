class List < ApplicationRecord
  has_many :products, dependent: :destroy
end
