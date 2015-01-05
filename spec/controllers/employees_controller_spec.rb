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

  describe 'get #index' do
    before(:each) do
      request.env['HTTP_ACCEPT'] = 'application/json'
    end

    it 'is successful' do
      get :index, :format => 'json'

      parse_index_json_and_check_it :Employee, response
    end
  end

end