FactoryGirl.define do

  factory :revenue_source do
    sequence(:name) {|n| "revenuesource#{n}" }
  end

end
