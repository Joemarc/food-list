class CategorySerializer < ActiveModel::Serializer
  attributes :id, :created_at, :name, :clean_products

  def clean_products
    arr = []
    ProductName.find_each.map { |pn| arr << pn.id }
    arr2 = []
    Product.find_each.map { |p| arr2 << p.product_name_id }
    clean_arr = (arr - arr2) | (arr2 - arr)
    product_names = []
    clean_arr.each do |c|
      found = ProductName.find(c)
      product_names << found
    end
    product_names
  end
end