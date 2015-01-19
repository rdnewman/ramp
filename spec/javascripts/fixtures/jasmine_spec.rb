require 'spec_helper'
require 'rake'

RSpec.describe 'Jasmine suite', :js do
  before :all do
    Ramp::Application.load_tasks
  end

  it 'test' do
    puts "\nRunning Jasmine..."
    expect { Rake::Task['spec:javascript'].invoke }.not_to raise_exception
  end
end
