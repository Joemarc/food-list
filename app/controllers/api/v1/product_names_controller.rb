class Api::V1::ProductNamesController < ApplicationController
  skip_before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def create
    @product_name = ProductName.create!(product_name_params)
    render json: @product_name
  end

  private

  def product_name_params
    params.require(:product_name).permit(:name, :category_id)
  end
end
