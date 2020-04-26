class ListWithProductsSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :title, :description, :author

  has_many :products
end