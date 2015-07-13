(function () {
    'use strict';
    angular.module('fifa14app').controller('uploadController',uploadController);
    uploadController.$inject=['$modalInstance'];

    function uploadController($modalInstance) {
        var vm = this;
        vm.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
        vm.generateThumb = generateThumb;
        vm.uploadFile = uploadFile;
        vm.cancel = cancel;
        vm.picFile = null;

        function generateThumb(file) {
            if (file != null) {
                // alert($scope.folderName);
                if (vm.fileReaderSupported && file.type.indexOf('image') > -1) {
                    $timeout(function () {
                        var fileReader = new FileReader();
                        fileReader.readAsDataURL(file);
                        fileReader.onload = function (e) {
                            $timeout(function () {
                                file.dataUrl = e.target.result;
                            });
                        }
                    });
                }
            }
        };

        function uploadFile() {
            $upload.upload({
                url: "/api/files/upload", // webapi url
                method: "POST",
                data: { folderName: vm.folderName },
                file: file
            }).progress(function (evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (data, status, headers, config) {
                $modalInstance.close(data);
            }).error(function (data, status, headers, config) {
                console.log(data);
            });
        }

        function cancel() {
            //$modalInstance.close();
            $modalInstance.dismiss('cancel');
        };

     };
}());