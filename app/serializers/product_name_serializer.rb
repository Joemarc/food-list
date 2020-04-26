class ProductNameSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :name, :category_id
end