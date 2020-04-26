class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  def render_ok
    render nothing: true, status: 200
  end
end
