require 'spec_helper'

describe EmployeesController do
  render_views

  before(:each) do
    department = FactoryGirl.create :department
    @employees = []
    10.times do
      @employees << FactoryGirl.create(:random_employee, department: department)
    end
  end

  describe 'routing' do
    it 'routes to #index' do
      expect({ get: 'employees'}).to route_to( {controller: 'employees', action: 'index'})
    end
    it 'routes to #show' do
      expect({ get: "employees/#{@employees.first.id}"}).to route_to({controller: 'employees', action: 'show', id: @employees.first.id.to_s})
    end
    it 'routes to #create' do
      expect({ post: 'employees'}).to route_to({controller: 'employees', action: 'create'})
    end
    it 'routes to #update' do
      expect({put: "employees/#{@employees.first.id}"}).to route_to({controller: 'employees', action: 'update', id: @employees.first.id.to_s})
    end
    it 'routes to #destroy' do
      expect({delete: "employees/#{@employees.first.id}"}).to route_to({controller: 'employees', action: 'destroy', id: @employees.first.id.to_s})
    end
    it 'doesn\'t route to #edit' do
      expect({get: "employees/#{@employees.first.id}/edit"}).not_to be_routable
    end
  end

  context 'CRUD operations' do
    before(:each) do
      request.env['HTTP_ACCEPT'] = 'application/json'
    end

    describe 'get #index' do
      it 'is successful' do
        get :index, :format => 'json'
        parse_index_json_and_check_it :Employee, response
      end
    end

    describe 'post #create' do
      it 'is successful' do
        new_employee = {:name => 'Lara', :surname => 'Larsson', :ranking => 100}
        post :create, new_employee, :format => 'json'
        parse_one_record_json_and_check_it new_employee, response
      end
    end

    describe 'get #show' do
      it 'is successful' do
        get :show, :id => @employees.first.id.to_s, :format => 'json'

        expected_record = convert_object_to_hash(@employees.first,[:name,:surname,:ranking])
        parse_one_record_json_and_check_it expected_record, response
      end
    end

    describe 'put #update' do
      it 'is successful' do
        record_to_be_updated = convert_object_to_hash(@employees.first,[:id,:name,:surname,:ranking])
        record_to_be_updated[:surname] = 'Johansson'
        record_to_be_updated[:ranking] = 99

        p record_to_be_updated

        put :update, record_to_be_updated, :format => 'json'
        p response.body
        expected_record = {surname: 'Johansson', ranking: 99}
        parse_one_record_json_and_check_it expected_record, response
      end
    end
  end


end