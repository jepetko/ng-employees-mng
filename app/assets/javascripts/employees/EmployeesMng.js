(function() {
    "use strict";

    angular.module('ng-employees-mng', ['ngResource', 'scope-aware'])
        .run(['$http', function($http) {

            var token = $( 'meta[name="csrf-token"]' ).attr( 'content' );
            $http.defaults.headers.common['X-CSRF-Token'] = token;
        }])
        .service('RestService', ['$resource', function($resource) {
            return $resource('/employees/:id.json', null, {
                update : {
                    method: 'PUT'
                },
                save : {
                    method: 'POST'
                }
            });
        }])
        .controller('EmployeesCtrl', ['$scope', 'RestService', 'Inspector', '$rootScope', function($scope, RestService, Inspector, $rootScope) {
            $scope.employees = [];
            $scope.record = {};
            $scope.template = { url : '/assets/employees_form.html'};

            $scope.init = function() {
                RestService.query(function(data) {
                    $scope.employees = data;
                });

                console.log(Inspector.inspect($rootScope));
            };

            $scope.get = function(id) {
                $scope.record = RestService.get({id: id});
            };

            $scope.action = function() {
                if($scope.record && $scope.record.id && $scope.record.id > 0) {
                    $scope.update();
                } else {
                    $scope.insert();
                }
            };

            $scope.update = function() {
                $scope.record = RestService.update({id : $scope.record.id}, $scope.record);
                $scope.init();
            };

            $scope.insert = function() {
                $scope.record = RestService.save($scope.record);
                $scope.init();
            };

            $scope.getBtnValue = function() {
                return ($scope.record && $scope.record.id > 0) ? 'Update' : 'Insert';
            };

            $scope.init();
        } ])
        .directive('numeric', function() {
            return {
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel)  {

                    var pattern = new RegExp('[0-9]+', 'g');

                    //user inserts a value
                    ngModel.$parsers.unshift(function(value) {
                        var ok = true;
                        if(typeof value !== 'undefined') {
                            var str = "" + value;
                            var result = str.match(pattern);
                            ok = (result !== null);
                        }
                        ngModel.$setValidity('numeric', ok);
                        return value;
                    });

                    //value comes from the model
                    ngModel.$formatters.unshift(function(value) {
                        var ok = true;
                        if(typeof value !== 'undefined') {
                            var str = "" + value;
                            var result = str.match(pattern);
                            ok = (result !== null);
                        }
                        ngModel.$setValidity('numeric',ok);
                        return value;
                    });
                }
            };
        });
})();