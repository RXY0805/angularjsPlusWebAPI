angular.module("fifa14app")
 .controller("yesnoController", yesnoController);

yesnoController.$inject = ['$modalInstance'];

function yesnoController($modalInstance) {
    var vm = this;
    vm.ok = ok;
    vm.cancel = cancel;

    function ok() {
        $modalInstance.close();
    }
    function cancel() {
        $modalInstance.dismiss('cancel');
    }
}






