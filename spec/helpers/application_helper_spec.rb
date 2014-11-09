require 'rails_helper'

RSpec.describe ApplicationHelper, type: :helper do

  describe "bootstrap formatting of flash messages" do
    it "treats notices as info class" do
      expect(flash_class('notice')).to  eq 'alert alert-info'
    end

    it "treats success as success class" do
      expect(flash_class('success')).to eq 'alert alert-success'
    end

    it "treats errors as error class" do
      expect(flash_class('error')).to   eq 'alert alert-error'
    end

    it "treats alerts as error class" do
      expect(flash_class('alert')).to   eq 'alert alert-error'
    end

    it "treats unrecognized levels as error class" do
      expect(flash_class('asdfasd')).to eq 'alert alert-error'
    end

  end

end