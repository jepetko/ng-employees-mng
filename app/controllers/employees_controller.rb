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

  def create
    employee = Employee.new({:name => params['name'], :surname => params['surname'], :ranking => params['ranking']})
    employee.save!
    respond_to do |format|
      format.json { render json: employee }
    end
  end

  def update
    employee_param = params
    employee = Employee.find_by_id(employee_param[:id])
    employee_param.map do |k,v|
      if employee.attribute_present?(k)
        employee.send("#{k}=",v)
      end
    end
    employee.save!
    respond_to do |format|
      format.json {render json: employee.reload}
    end
  end

  def destroy
  end
end
