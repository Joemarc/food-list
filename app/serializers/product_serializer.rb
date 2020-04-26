class ProductSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :name, :description, :status, :quantity, :category

  def category
    cat = Category.find(object.category_id)
    cat.name
  end
end