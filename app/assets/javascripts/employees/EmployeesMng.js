(function() {
    "use strict";

    angular.module('ng-employees-mng', ['ngResource'])
        .service('RestService', ['$resource', function($resource) {
            return $resource('/employees/:id.json', null, {
                update : {
                    method: 'PUT'
                }
            });
        }])
        .controller('EmployeesCtrl', ['$scope', 'RestService', function($scope, RestService) {
            $scope.employees = [];
            $scope.record = {};
            $scope.template = { url : '../../templates/employees_form.html'};

            $scope.init = function() {
                RestService.query(function(data) {
                    $scope.employees = data;
                });
            };

            $scope.get = function(id) {
                $scope.record = RestService.get({id: id});
            };

            $scope.update = function(data) {
                if(!data) {
                    $scope.record = RestService.update({id: $scope.record.id}, $scope.record);
                } else {
                    $scope.record = RestService.update({id : data.id}, data);
                }
                $scope.init();
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