angular.module("fifa14app")
 .controller("noticeController", noticeController);

noticeController.$inject = ['$modalInstance','information'];

function noticeController($modalInstance, information) {
    var vm = this;
    vm.ok = ok;
    vm.noticeInfo = information;
    function ok() {
        $modalInstance.close();
    }
}






