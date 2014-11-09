require 'rails_helper'

RSpec.describe RevenueSource, type: :model do

  it "must have a name" do
    expect(subject).not_to be_valid
  end

end
