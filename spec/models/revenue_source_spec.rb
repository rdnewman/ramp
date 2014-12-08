require 'rails_helper'

RSpec.describe RevenueSource, type: :model do

  it "must have a name" do
    expect(RevenueSource.create.errors[:name].any?).to be true
  end

end
