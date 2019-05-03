class Api::V1::UsersController < ApiController
  def show
    if params['id'] == 'me'
      show_me()
    else
      render json: User.find(params['id']), serializer: UserShowSerializer
    end
  end

  private
  def show_me
    return unless logged_in
    render json: current_user, serializer: UserShowSerializer
  end
end
