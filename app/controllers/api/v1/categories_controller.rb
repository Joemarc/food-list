class Api::V1::CategoriesController < ApplicationController
  skip_before_action :authenticate_user!
  skip_before_action :verify_authenticity_token
  before_action :find_category, only: %i[show edit destroy update]

  def index
    @categories = Category.all.order(name: :asc)
    render json: @categories, each_serializer: CategorySerializer, listId: params[:list_id]
  end

  def create
    last = Category.last.id
    @category = Category.create(id: last + 1, name: params[:name])
    render json: @category
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end

  def find_category
    @category = Category.find(params[:id])
  end
end
