class UsersController < ApplicationController
  def index
    render "/react"
  end

  def show
    render json: User.all
  end
end
