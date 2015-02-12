class ApplicationController < ActionController::Base

  ##
  # Prevent CSRF attacks by raising an exception.
  # (For APIs, you may want to use :null_session instead.)
  protect_from_forgery with: :exception

  after_filter :flash_to_http_header

private

  ##
  # Copies flash message to response header so that javascript
  # can pick it up for processing
  def flash_to_http_header
    return unless request.xhr?
    response.headers['X-FlashMessages'] = flash.to_hash.to_json
    flash.discard  # don't want the flash to appear when you reload page
  end

end
