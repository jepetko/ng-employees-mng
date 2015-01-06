class EmployeesController < ApplicationController
  def index
    all = Employee.all
    respond_to do |format|
      format.json { render json: all.to_json }
    end
  end

  def show
    employee = Employee.find_by_id(params[:id])
    respond_to do |format|
      format.json { render json: employee}
    end
  end

  def new
  end

  def create
    employee = Employee.new({:name => params['name'], :surname => params['surname'], :ranking => params['ranking']})
    employee.save!
    respond_to do |format|
      format.json { render json: employee }
    end
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
