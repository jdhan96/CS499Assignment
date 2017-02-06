(function() {
    'use strict';

    angular
        .module('assignment2App')
        .controller('EmployeeController', EmployeeController);

    EmployeeController.$inject = ['$scope', '$state', 'Employee'];

    function EmployeeController ($scope, $state, Employee) {
        var vm = this;

        vm.employees = [];

        loadAll();

        function loadAll() {
            Employee.query(function(result) {
                vm.employees = result;
                vm.searchQuery = null;
            });
        }
    }
})();
