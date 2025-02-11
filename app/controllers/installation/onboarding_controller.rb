class Installation::OnboardingController < ApplicationController
  before_action :ensure_installation_onboarding

  def index; end

  def create
    begin
      AccountBuilder.new(
        account_name: onboarding_params.dig(:user, :company),
        user_full_name: onboarding_params.dig(:user, :name),
        email: onboarding_params.dig(:user, :email),
        user_password: params.dig(:user, :password),
        confirmed: true
      ).perform
    rescue StandardError => e
      redirect_to '/', flash: { error: e.message } and return
    end
    finish_onboarding
    redirect_to '/'
  end

  private

  def onboarding_params
    params.permit(:subscribe_to_updates, user: [:name, :company, :email])
  end

  def finish_onboarding
    ::Redis::Alfred.delete(::Redis::Alfred::op2_INSTALLATION_ONBOARDING)
    op2Hub.register_instance(onboarding_params) if onboarding_params[:subscribe_to_updates]
  end

  def ensure_installation_onboarding
    redirect_to '/' unless ::Redis::Alfred.get(::Redis::Alfred::op2_INSTALLATION_ONBOARDING)
  end
end
