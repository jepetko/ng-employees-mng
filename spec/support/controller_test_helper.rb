module ControllerTestHelper

  def parse_index_json_and_check_it(model,response)
    body = response.body
    body =~ /^\[(.*)\]$/
    json = ActiveSupport::JSON.decode(body)
    expect(json).to be_a(Array)

    expect(json.length).to eq( Kernel.const_get(model).all.count )
  end

end