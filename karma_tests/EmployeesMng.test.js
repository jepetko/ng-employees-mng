describe('ng-employees-mng',function() {

    var scope, httpBackend, RestService, EmployeesCtrl, whenGetAll, whenGetAllDefaultResponse;
    var Inspector;

    beforeEach(module('ng-employees-mng'));
    beforeEach(module('templates'));
    beforeEach(module('scope-aware'));

    beforeEach(inject(function($rootScope, $httpBackend, $controller, _RestService_, _Inspector_) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;

        whenGetAll = httpBackend.whenGET('/employees.json');

        whenGetAllDefaultResponse =[{
            "id" : 1,
            "name" : "Lindsey",
            "surname" : "Craft",
            "department" : "MARKETING",
            "ranking" : 43
        }, {
            "id" : 2,
            "name" : "Erica",
            "surname" : "Larsen",
            "department" : "IT",
            "ranking" : 71
        }, {
            "id" : 3,
            "name" : "Ryan",
            "surname" : "Levine",
            "department" : "MARKETING",
            "ranking" : 20
        }];

        httpBackend.whenGET('/employees/2.json').respond(200, {
            "id" : 2,
            "name" : "Erica",
            "surname" : "Larsen",
            "department" : "IT",
            "ranking" : 71
        });

        httpBackend.whenPUT('/employees/2.json', {id: 2, name : 'Elisabeth'}).respond(200, {
            "id" : 2,
            "name" : "Elisabeth",
            "surname" : "Larsen",
            "department" : "IT",
            "ranking" : 71
        });

        httpBackend.whenPOST('/employees.json', {name: 'Lara', surname: 'Larsson', department: 'IT', ranking: 100}).respond(200, {
            "id": 10,
            "name": "Lara",
            "surname": "Larsson",
            "department": "IT",
            "ranking": 100
        });

        RestService = _RestService_;
        EmployeesCtrl = $controller('EmployeesCtrl', {
            '$scope' : scope,
            'RestService' : RestService
        });

        Inspector = _Inspector_;

    }));

    describe('RestService', function() {

        beforeEach(function() {
            whenGetAll.respond( whenGetAllDefaultResponse );
        });

        it('should provide methods for REST API', function() {
            expect(typeof RestService.query).toBe('function');
        });

        it('should return employees', function() {
            var all = [];
            RestService.query(function(data) {
                all = data;
            });
            httpBackend.flush();
            expect(all.length).toBe(3);
        });

        it('should return 1 employee', function() {
            var record = {};
            RestService.get({id: 2},function(data) {
                record = data;
            });
            httpBackend.flush();
            expect(record).toEqual(jasmine.objectContaining({ name : 'Erica', id: 2}));
        });

        it('should save 1 employee', function() {
            var record = {};
            RestService.save({ name: "Lara", surname: "Larsson", department: "IT", ranking: 100}, function(data) {
                record = data;
            });
            httpBackend.flush();
            expect(record).toEqual(jasmine.objectContaining({name: 'Lara', id: 10}));
        });
    });

    describe('EmployeesCtrl', function() {

        it('should have 3 employees out of the box', function() {

            //default response
            whenGetAll.respond( whenGetAllDefaultResponse );

            httpBackend.flush();
            expect(scope.employees.length).toBe(3);
        });

        it('should be able to fetch an employee', function() {

            //default response
            whenGetAll.respond( whenGetAllDefaultResponse );

            scope.get(2);
            httpBackend.flush();
            expect(scope.record).toEqual(jasmine.objectContaining({ name : 'Erica'}));
        });

        it('should be able to create a new employee', function() {

            //default response for refreshing the list
            whenGetAll.respond( whenGetAllDefaultResponse );

            scope.record = {name: 'Lara', surname: 'Larsson', department: 'IT', ranking: 100};
            scope.insert();
            httpBackend.flush();

            expect(scope.record).toEqual(jasmine.objectContaining({id: 10, name: 'Lara', surname: 'Larsson', ranking: 100}));
        });

        it('should be able to update an employee and reload the list', function() {

            whenGetAll.respond( [{
                "id" : 1,
                "name" : "Lindsey",
                "surname" : "Craft",
                "department" : "MARKETING",
                "ranking" : 43
            }, {
                "id" : 2,
                "name" : "Elisabeth",  // <=============== should have been changed... (Erica => Elisabeth)
                "surname" : "Larsen",
                "department" : "IT",
                "ranking" : 71
            }, {
                "id" : 3,
                "name" : "Ryan",
                "surname" : "Levine",
                "department" : "MARKETING",
                "ranking" : 20
            }]);
            scope.record = {id: 2, name : 'Elisabeth'};

            scope.update();
            httpBackend.flush();

            expect(scope.record).toEqual(jasmine.objectContaining({ name : 'Elisabeth'}));

            scope.init();
            expect(scope.employees[1]).toEqual(jasmine.objectContaining({ name : 'Elisabeth'}));
        });

    });

    //Form validations:
    describe('EmployeesCtrl Form Behaviour', function() {

        var element, controller;

        beforeEach(function() {
            whenGetAll.respond( whenGetAllDefaultResponse );
        });

        beforeEach(inject(function($compile, $templateCache) {
            var template = $templateCache.get('employees_form.html');
            var link = $compile(template);
            element = link(scope);
            //dont forget digest !!!
            scope.$digest();
        }));

        it('should be invalid when input fields are empty', function(){
            expect(scope.empForm).toBeDefined();
            expect(scope.empForm.$valid).toBe(false);
        });

        it('should be invalid when surname is empty', (inject(function($filter) {
            scope.empForm.name.$setViewValue('Claudia');
            //console.log($filter('json')(scope.empForm.$error));
            expect(scope.empForm.$valid).toBe(false);
        })));

        it('should be valid when surname and name are not empty', (inject(function($filter) {
            scope.empForm.name.$setViewValue('Claudia');
            scope.empForm.surname.$setViewValue('Stadler');
            scope.empForm.ranking.$setViewValue(50);

            //console.log($filter('json')(scope.empForm.$error));

            expect(scope.empForm.$valid).toBe(true);
        })));

        //custom validation:
        it('should be invalid when ranking is alphanumeric', function() {
            scope.empForm.name.$setViewValue('Claudia');
            scope.empForm.surname.$setViewValue('Stadler');
            scope.empForm.ranking.$setViewValue('bla');

            expect(scope.empForm.$valid).toBe(false);

            var submit, inputs = element.find('input');
            angular.forEach(inputs, function(input) {
                if(input.type === 'submit') {
                    submit = input;
                }
            });
            expect(submit.attributes['disabled'].value).toBe('disabled');
        });
    });
});