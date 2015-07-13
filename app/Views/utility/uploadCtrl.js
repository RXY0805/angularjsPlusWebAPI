(function () {
    'use strict';
    angular.module('fifa14app').controller('uploadController',uploadController);
    uploadController.$inject = ['$modalInstance', '$http', 'Upload', '$timeout','folderName'];

    function uploadController($modalInstance, $http, Upload, $timeout, folderName) {
        var vm = this;
        vm.files = [];
        vm.defaultFlagUrl = 'http://localhost:29482/app/images/nation/Desert.jpg';
        vm.uploadFile = uploadFile;
        vm.cancel = cancel;

        function uploadFile(file) {
            
            if (file) {
                Upload.upload({
                    url: "/api/files/upload", // webapi url
                    method: "POST",
                    data: { folderName: folderName },
                    file: file
                }).progress(function (evt) {
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function (data, status, headers, config) {
                    $modalInstance.close(data);
                }).error(function (data, status, headers, config) {
                    console.log(data);
                });
            }
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        };
     };
}());