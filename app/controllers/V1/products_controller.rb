class ProductsController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :find_list, only: %i[show edit destroy update]

  def index
    @products = Product.all
    render json: @products
  end

  def create
    @list = Product.create!(list_params)
    render json: @list
  end

  def edit
  end

  def update
    @list.update_attributes(list_params)
    render json: @list
  end

  def show
    render json: @list
  end

  def destroy
    @list.destroy
  end

  private

  def list_params
    params.require(:list).permit(:title, :description)
  end

  def find_list
    @list = Product.find(params[:id])
  end
end
