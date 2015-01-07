module ControllerTestHelper

  def parse_index_json_and_check_it(model,response)
    body = response.body
    body =~ /^\[(.*)\]$/
    json = ActiveSupport::JSON.decode(body)
    expect(json).to be_a(Array)

    expect(json.length).to eq( Kernel.const_get(model).all.count )
  end

  def parse_one_record_json_and_check_it(record, response)
    body = response.body
    body =~ /^\[(.*)\]$/
    json = ActiveSupport::JSON.decode(body)
    record.map do |key,val|
      expect(json[key.to_s]).to eq(val)
    end
  end

  def convert_object_to_hash(record, properties)
    hash = {}
    properties.each do |key|
      hash[key] = record.send(key)
    end
    p hash
    hash
  end
end