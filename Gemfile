source 'http://rubygems.org'

gem 'rails', '>= 4.1'
gem 'mysql2'
gem 'responders', '~> 2.0'

gem 'jquery-rails'
gem 'turbolinks'
gem 'react-rails', github: 'reactjs/react-rails', branch: 'master'

gem 'haml'
gem 'sass-rails', '< 5.0'    # 5.0.1 (latest as of writing) has issue with wildcard import (https://github.com/rails/sass-rails/issues/185)
gem 'bootstrap-sass'
gem 'autoprefixer-rails'

gem 'uglifier'

group :development do
end

group :test do
  gem 'simplecov', :require => false
end

group :development, :test do
  gem 'rspec-rails'
  gem 'factory_girl_rails'
  gem 'jasmine'
end
