class Api::V1::ListsController < ApplicationController
  skip_before_action :authenticate_user!
  skip_before_action :verify_authenticity_token
  before_action :find_list, only: %i[show edit destroy update products]

  def index
    @lists = List.all
    render json: @lists, each_serializer: ListSerializer
  end

  def create
    @list = List.create!(list_params)
    render json: @list
  end

  def edit
    render json: @list
  end

  def update
    @list.update_attributes(list_params)
    render json: @list
  end

  def show
    render json: @list, serializer: ListWithProductsSerializer
  end

  def destroy
    @list.destroy
    render_ok
  end

  def products
    @products = @list.products.order(name: :asc)
    render json: @products, each_serializer: ProductListSerializer
  end

  private

  def list_params
    params.require(:list).permit(:title, :description, :author)
  end

  def find_list
    @list = List.find(params[:id])
  end
end