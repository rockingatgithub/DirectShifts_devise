class Api::V1::ReferralsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  before_action :set_api_v1_referral, only: %i[ edit update destroy ]
  before_action :set_api_v1_referralLink, only: %i[ show ]
  before_action :check_api_v1_toEmail, only: %i[ create ]

  # GET /api/v1/referrals or /api/v1/referrals.json
  def index
    @api_v1_referrals = Api::V1::Referral.all

    render json: { message: 'Fetched Referrals', referrals: @api_v1_referrals.where(fromEmail: current_user.email) }
  end

  # GET /api/v1/referrals/1 or /api/v1/referrals/1.json
  def show
    if @api_v1_referralLink
      render json: { message: 'Valid Referral', referrals: @api_v1_referralLink }
    else
      render json: { message: 'Invalid Referral' }
    end
  end

  # GET /api/v1/referrals/new
  def new
    @api_v1_referral = Api::V1::Referral.new
  end

  # GET /api/v1/referrals/1/edit
  def edit
  end

  # POST /api/v1/referrals or /api/v1/referrals.json
  def create
    @api_v1_referral = Api::V1::Referral.new(api_v1_referral_params)
    @api_v1_referrals = Api::V1::Referral.all

    if !@api_v1_isUserRegistered
      if @api_v1_referral.save
        render json: { status: :created, location: @api_v1_referral, referrals: @api_v1_referrals.where(fromEmail: current_user.email) }
      else
        render json: { erros: @api_v1_referral.errors, status: :unprocessable_entity }
      end
    else
      render json: { erros: 'User already registered' }
    end
  end

  # PATCH/PUT /api/v1/referrals/1 or /api/v1/referrals/1.json
  def update
    respond_to do |format|
      if @api_v1_referral.update(api_v1_referral_params)
        format.html { redirect_to api_v1_referral_url(@api_v1_referral), notice: "Referral was successfully updated." }
        format.json { render :show, status: :ok, location: @api_v1_referral }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @api_v1_referral.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /api/v1/referrals/1 or /api/v1/referrals/1.json
  def destroy
    @api_v1_referral.destroy

    respond_to do |format|
      format.html { redirect_to api_v1_referrals_url, notice: "Referral was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_api_v1_referral
      @api_v1_referral = Api::V1::Referral.find(params[:id])
    end

    def set_api_v1_referralLink
      @api_v1_referralLink = Api::V1::Referral.find_by(referralLink: params[:id])
    end

    def check_api_v1_toEmail
      @api_v1_isUserRegistered = Api::V1::Referral.find_by(toEmail: params[:api_v1_referral][:toEmail])
    end

    # Only allow a list of trusted parameters through.
    def api_v1_referral_params
      params.require(:api_v1_referral).permit(:toEmail, :fromEmail, :referralLink)
    end
end
