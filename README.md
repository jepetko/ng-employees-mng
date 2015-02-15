ng-employees-mng
================

Rails &lt;3 AngularJS

# general recipe how to create such a project

## use rails composer

```
$ mkdir ng-employees-mng
$ cd ng-employees-mng
$ rvm use ruby-2.1.2@ng-employees-mng --ruby-version --create
# this will create .ruby-version and .ruby-gemset
$ gem install rails
$ gem install rails_apps_composer
$ rails_apps_composer new . -r core
```

## create model and controller

```
bundle exec rails g model Employee name surname ranking:integer department_id:integer
```

### example for create controller

```
bundle exec rails g controller Employees index show new create edit update destroy
```
