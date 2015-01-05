require 'rails_helper'

RSpec.describe Employee, :type => :model do

  before(:each) do
    @employee = FactoryGirl.create(:employee)
    @employee_with_department = FactoryGirl.create(:random_employee_with_department)
    @invalid_employee = Employee.new
  end

  it 'should have name, surname and ranking' do
    expect(@employee).to respond_to(:name)
    expect(@employee).to respond_to(:surname)
    expect(@employee).to respond_to(:ranking)
  end

  it 'should belong to a department' do
    expect(@employee).to respond_to(:department)
  end

  it 'should be invalid when name is empty' do
    expect(@invalid_employee).to be_invalid
    expect(@invalid_employee.errors[:name]).to include('can\'t be blank')
    expect(@invalid_employee.errors[:surname]).to include('can\'t be blank')
  end

  it 'should reference a department' do
    expect(@employee_with_department).to be_valid
    expect(@employee_with_department.department).not_to be_nil
    expect(@employee_with_department.department.name).to eq('Marketing')
  end
end
