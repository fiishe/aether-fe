class Api::V1::UsersController < ApiController
  def me
    if current_user
      render json: current_user, serializer: CurrentUserSerializer
    else
      render_error(401)
    end
  end
end
