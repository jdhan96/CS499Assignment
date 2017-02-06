(function() {
    'use strict';

    angular
        .module('assignment2App')
        .controller('DepartmentController', DepartmentController);

    DepartmentController.$inject = ['$scope', '$state', 'Department'];

    function DepartmentController ($scope, $state, Department) {
        var vm = this;

        vm.departments = [];

        loadAll();

        function loadAll() {
            Department.query(function(result) {
                vm.departments = result;
                vm.searchQuery = null;
            });
        }
    }
})();
