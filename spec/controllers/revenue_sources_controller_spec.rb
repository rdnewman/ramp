require 'rails_helper'

RSpec.describe RevenueSourcesController, type: :controller do

  describe "'GET' index" do
    it 'succeeds on HTML' do
      get :index
      expect(response).to be_success
    end

    it 'succeeds as JSON' do
      xhr :get, :index, format: :json
      expect(response).to be_success
    end
  end

  describe "'GET' new" do
    it 'succeeds' do
      get :new
      expect(response).to be_success
    end
  end

  describe "'POST' create" do
    it 'succeeds if well formed input and returns to list' do
      post :create, revenue_source: FactoryGirl.attributes_for(:revenue_source)
      expect(response.location).to redirect_to revenue_sources_path
    end

    it 'adds a record if well formed input' do
      expect {
        post :create, revenue_source: FactoryGirl.attributes_for(:revenue_source)
      }.to change{RevenueSource.count}.by(1)
    end

    it 'fails with error if no input supplied' do
      expect {
        post :create, revenue_source: nil
      }.to raise_error ActionController::ParameterMissing
    end

    it 'will not add a record if missing name parameter' do
      _params = {b: 'something'}
      expect {
        post :create, revenue_source: _params
      }.to change{RevenueSource.count}.by(0)
    end

    it 'responds with :bad_request if missing name parameter' do
      _params = {b: 'something'}
      post :create, revenue_source: _params
      expect(response).to have_http_status :bad_request
    end

    it 'returns to list if missing name parameter' do
      _params = {b: 'something'}
      post :create, revenue_source: _params
      expect(response.location).to eq revenue_sources_url
    end

  end

  describe "'PUT' update" do

    let(:source) { FactoryGirl.create(:revenue_source) }

    it 'changes name' do
      # setup
      _row = RevenueSource.find_by_id(source.id)
      _oldname = _row.name
      _params = { name: "#{_oldname}CHANGE" }

      # test
      put :update, id: source.id, revenue_source: _params
      _row.reload
      expect(_row.name).not_to eq _oldname
    end

    it 'fails with error if no input supplied' do
      expect {
        put :update, id: source.id, revenue_source: nil
      }.to raise_error ActionController::ParameterMissing
    end

    context 'as HTML' do
      it 'succeeds if well formed input and returns to list' do
        _params = { name: "#{source.name}CHANGE" }
        put :update, :format => :html, id: source.id, revenue_source: _params
        expect(response).to redirect_to revenue_sources_path
      end

      it 'responds with :bad_request if missing name parameter' do
        Rails.logger.info 'returns to list if missing name parameter'
        _params = {b: 'something'}
        put :update, :format => :html, id: source.id, revenue_source: _params
        expect(response).to have_http_status :bad_request
      end

      it 'returns to list if missing name parameter' do
        Rails.logger.info 'returns to list if missing name parameter'
        _params = {b: 'something'}
        put :update, :format => :html, id: source.id, revenue_source: _params
        expect(response.location).to eq revenue_sources_url
      end
    end

    context 'as JSON' do
      it 'succeeds if well formed input' do
        _params = { name: "#{source.name}CHANGE" }
        put :update, :format => :json, id: source.id, revenue_source: _params
        expect(response).to be_success
      end

      it 'that is well-formed, responds with JSON showing changed name' do
        _params = { name: "#{source.name}CHANGE" }
        put :update, :format => :json, id: source.id, revenue_source: _params
        json_response = JSON(response.body)
        expect(json_response['name']).to eq _params[:name]
      end

      it 'that is well-formed, responds with JSON showing updated time' do
        # setup
        _row = RevenueSource.find_by_id(source.id)
        _oldtime = _row.updated_at
        _params = { name: "#{source.name}CHANGE" }
        sleep 5.seconds

        sleep 0.6  # assure it is sufficiently later (server time drift)

        # test
        put :update, format: :json, id: source.id, revenue_source: _params
        json_response = JSON(response.body)
        _newtime = Time.zone.parse(json_response['updated_at'])
        expect(_newtime).to be > _oldtime
      end

      it 'that is missing valid parameter, responds with bad request status (400)' do
        # setup
        _row = RevenueSource.find_by_id(source.id)
        _oldtime = _row.updated_at.to_json
        _params = {b: 'something'}

        # test
        put :update, format: :json, id: source.id, revenue_source: _params
        expect(response).to have_http_status :bad_request
      end

      it 'that is missing valid parameter, does not modify the record' do
        # setup
        _row = RevenueSource.find_by_id(source.id)
        _oldtime = _row.updated_at.to_json
        _params = {b: 'something'}

        # test
        put :update, :format => :json, id: source.id, revenue_source: _params
        json_response = JSON(response.body)
        _newtime = "\"#{json_response['updated_at']}\""
        expect(_newtime).to eq _oldtime
      end
    end

  end

end
