angular.module("fifa14app")
 .controller("yesnoController", yesnoController);

yesnoController.$inject = ['$modalInstance', 'message'];

function yesnoController($modalInstance, message) {
    var vm = this;
    vm.ok = ok;
    vm.cancel = cancel;
    vm.noticeInfo = message;
    var isConfirmed = false;
 
    function ok() {
        isConfirmed = true;
        $modalInstance.close(isConfirmed);
    };
   
    function cancel() {
        $modalInstance.dismiss('cancel');
    }
}






