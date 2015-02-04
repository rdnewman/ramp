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
      redirect_to revenue_sources_path
    end
  end

  def update
    _source = RevenueSource.find_by_id(params[:id])
    _oldname = _source.name

    _params = revenue_source_params
    if _params.empty?
      flash[:error] = "Unable to update #{_oldname} due to client error."
      respond_with do |format|
        format.json { render json: _source, status: :bad_request }
        format.html { redirect_to revenue_sources_path, status: :bad_request }
      end
    else
      begin
        _source.update_attributes(_params)
        flash[:success] = "Updated #{_oldname} to #{_params[:name]}."
      rescue StandardError => e
        Rails.logger.error "[RevenueSourcesController#update] failed, error = #{e.inspect}"
        flash[:error] = "Unable to update #{_oldname}."
      end
      respond_with do |format|
        format.json { render json: _source }
        format.html { redirect_to revenue_sources_path }
      end
    end
  end

  def destroy
    _source = RevenueSource.find_by_id(params[:id])
    _oldname = _source.name

    begin
      _source.destroy
      flash[:success] = "Removed #{_oldname}."
    rescue StandardError => e
      Rails.logger.error "[RevenueSourcesController#destroy] failed, error = #{e.inspect}"
      flash[:error] = "Unable to remove #{_oldname}."
    end
    respond_with do |format|
      format.json { render json: {} }
      format.html { redirect_to revenue_sources_path }
    end
  end

private
  def revenue_source_params
    params.require(:revenue_source).permit(:name)
  end

end
