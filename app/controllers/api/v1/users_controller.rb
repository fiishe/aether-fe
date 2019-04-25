class Api::V1::UsersController < ApiController
  def show
    render json: User.find(params['id']), serializer: UserShowSerializer
  end

  def me
    if current_user
      render json: current_user, serializer: UserShowSerializer
    else
      render_error(401)
    end
  end
end
