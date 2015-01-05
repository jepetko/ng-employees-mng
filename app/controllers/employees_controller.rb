class EmployeesController < ApplicationController
  def index
    all = Employee.all
    respond_to do |format|
      format.json { render json: all.to_json }
    end
  end

  def show
  end

  def new
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
