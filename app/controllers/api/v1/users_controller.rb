class Api::V1::UsersController < ApiController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
    users = Campaign.find(params['campaign_id']).users
    render json: users
  end

  def show
    if params['id'] == 'me' && !current_user
      render_error 401, "You are not logged on."
      return
    end
    user = get_user(params['id'])
    render json: user, serializer: UserShowSerializer
  end

  def update
    if !params[:nick].nil?
      params[:nick].strip!
    end

    @user = current_user
    if @user.nil?
      render json: {
        status: "fail",
        data: { message: "User is not logged in" }
      }
      return
    end

    @user.update(user_params)
    if @user.save
      render json: {
        status: "success",
        data: { user: UserShowSerializer.new(@user).as_json }
      }
    else
      render json: {
        status: "fail",
        data: { errors: @user.errors.full_messages }
      }
    end
  end

  private

  def user_params
    params.require(:user).permit(:nick, :bio)
  end

  def not_found
    render_error 404, "Could not find requested user(s)."
  end
end
