class DepartmentsController < ApplicationController

  def index
    all = Department.all
    respond_to do |format|
      format.json { render json: all.to_json }
    end
  end
end
