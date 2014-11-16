class RevenueSourcesController < ApplicationController
  respond_to :html, only: [:index]
  respond_to :json, only: [:index, :update]

  def index
    respond_with do |format|
      format.html { render }
      format.json { render json: RevenueSource.all }
    end
  end

  def new
    @source = RevenueSource.new
  end

  def create
    _params = revenue_source_params
    if _params.empty?
      flash[:error] = "Unable to add; client error."
      redirect_to revenue_sources_path, status: :bad_request
    else
      begin
        RevenueSource.create(_params)
        flash[:success] = "Added #{_params[:name]}."
      rescue StandardError => e
        Rails.logger.error "[RevenueSourcesController#create] failed, error = #{e.inspect}"
        flash[:error] = "Unable to add #{_params[:name]}."
      end
      redirect_to revenue_sources_path, status: :created
    end
  end

  def update
    _row = RevenueSource.find_by_id(params[:id])
    _params = revenue_source_params
    if _params.empty?
      flash[:error] = "Unable to update #{_params[:name]} due to client error."
      respond_with do |format|
        format.json { render json: _row, status: :bad_request }
        format.html { redirect_to revenue_sources_path, status: :bad_request }
      end
    else
      begin
        _row.update_attributes(_params)
        flash[:success] = "Updated #{_params[:name]}."
      rescue StandardError => e
        Rails.logger.error "[RevenueSourcesController#update] failed, error = #{e.inspect}"
        flash[:error] = "Unable to update #{_params[:name]}."
      end
      respond_with do |format|
        format.json { render json: _row }
        format.html { redirect_to revenue_sources_path }
      end
    end
  end


private
  def revenue_source_params
    params.require(:revenue_source).permit(:name)
  end

end
