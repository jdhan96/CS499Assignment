(function() {
    'use strict';

    angular
        .module('assignment2App')
        .controller('LocationDialogController', LocationDialogController);

    LocationDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Location', 'Company'];

    function LocationDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Location, Company) {
        var vm = this;

        vm.location = entity;
        vm.clear = clear;
        vm.save = save;
        vm.companies = Company.query({filter: 'location-is-null'});
        $q.all([vm.location.$promise, vm.companies.$promise]).then(function() {
            if (!vm.location.company || !vm.location.company.id) {
                return $q.reject();
            }
            return Company.get({id : vm.location.company.id}).$promise;
        }).then(function(company) {
            vm.companies.push(company);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.location.id !== null) {
                Location.update(vm.location, onSaveSuccess, onSaveError);
            } else {
                Location.save(vm.location, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('assignment2App:locationUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
