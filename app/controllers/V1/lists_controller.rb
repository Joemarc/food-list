class ListsController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :find_list, only: %i[show edit destroy update]

  def index
    @lists = List.all
    render json: @lists
  end

  def create
    @list = List.create!(list_params)
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
    @list = List.find(params[:id])
  end
end