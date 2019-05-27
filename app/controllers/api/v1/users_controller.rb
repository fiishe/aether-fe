class Api::V1::UsersController < ApiController
  def show
    if params['id'] == 'me'
      show_me()
    else
      render json: User.find(params['id']), serializer: UserShowSerializer
    end
  end

  def update
    @user = current_user
    @user.update(user_params)
    if @user.save
      render json: @user, serializer: UserShowSerializer
    else
      render json: {
        status: "fail",
        data: { errors: @review.errors.full_messages }
      }
    end
  end

  private
  def show_me
    return unless logged_in
    render json: current_user, serializer: UserShowSerializer
  end

  def user_params
    params.require(:user).permit(:nick, :bio)
  end
end
