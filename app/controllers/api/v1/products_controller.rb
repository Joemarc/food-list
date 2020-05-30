class Api::V1::ProductsController < ApplicationController
  skip_before_action :authenticate_user!
  skip_before_action :verify_authenticity_token
  before_action :find_product, only: %i[show edit destroy update]

  def create
    product_params[:product_ids].each do |i|
      pn = ProductName.find(i)
      @product = Product.create!(name: pn.name, product_name_id: pn.id, category_id: pn.category_id, list_id: product_params[:list_id])
    end
    render json: 'ok'
  end

  def edit
  end

  def update
    @product.update_attributes(product_params)
    render json: @product
  end

  def show
    render json: @product
  end

  def destroy
    @product.destroy
  end

  def in_products
    @in_products = Product.where(status: 0, list_id: params[:list_id]).order(category_id: :asc, name: :asc)
    render json: @in_products, each_serializer: ProductSerializer
  end

  def out_products
    @out_products = Product.where(status: 1, list_id: params[:list_id]).order(category_id: :asc, name: :asc)
    render json: @out_products, each_serializer: ProductSerializer
  end

  def refresh_list
    Product.where(status: 1, list_id: params[:list_id]).update_all(status: "in")
  end

  private

  def product_params
    params.require(:product).permit(:name, :description, :quantity, :status, :list_id, product_ids: [])
  end

  def find_product
    @product = Product.find(params[:id])
  end
end
