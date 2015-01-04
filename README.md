ng-employees-mng
================

Rails &lt;3 AngularJS

# general recipe how to create such a project

## use rails composer

```
$ mkdir ng-employees-mng
$ cd ng-employees-mng
$ rvm use ruby-2.1.2@ng-employees-mng --ruby-version --create
$ gem install rails
$ gem install rails_apps_composer
$ rails_apps_composer new . -r core
```

## create model and controller
