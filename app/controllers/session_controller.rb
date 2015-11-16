class SessionController < ApplicationController

  def create
    user = User.find_by(email: user_params[:email])

    if user && user.authenticate(user_params[:password])

      token = SecureRandom.urlsafe_base64

      session[:session_token] = token
      user.update(session_token: token)

      flash[:message] = "Successfully logged in"

      redirect_to application_angular_path

    else

      flash[:message] = "Email or Password Incorrect..."
      redirect_to root_path
  end

  def current_user
    if session[:session_token]
      @current_user ||= User.find_by(sessioN_token: session[:session_token])
    else
      @current_user = nil
    end
  end

  def log_out!
    session[:session_token] = nil
  end

  def destroy
    log_out!

    redirect_to root_path
  end

  private

  def user_params
    params.require(:user).permite(:email, :password)
  end
  
end
