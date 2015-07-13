(function () {
    'use strict';
    angular.module("fifa14app")
    .controller("groupController",groupController);

    groupController.$inject = ['groupFactory', 'nationFactory','matchFactory', 'commonFactory','$stateParams', '$state','$filter'];

    function groupController(groupFactory, nationFactory, matchFactory, commonFactory,$stateParams, $state, $filter) {
        var vm = this;
        //ng-model
        vm.selectedGroupID = $stateParams.groupid;
        var hostUrl = commonFactory.getBaseUrl();
        vm.flagPath = hostUrl + 'app/images/nation/';
        vm.selectedNationID = 0;
        vm.groupList = null;
        vm.nationList = null;
        vm.matchList = null;
        vm.nationMatchList = null;
        vm.filtered=null;
        //ng-method
        vm.selectGroup = selectGroup;
        vm.showDetail = showDetail;
        vm.nationEdit = nationEdit;
        vm.groupFilterFn = groupFilterFn;
       
        vm.newMatch = newMatch;
        vm.newNation = newNation;
        activate();

        function activate() {
            getGroupList();
            getNationList();
            getMatchList();
        }

        function getGroupList() {
            return groupFactory.getGroupList().then(function (data) {
                vm.groupList = data;
                if (!vm.selectedGroupID) {
                    vm.selectedGroupID = vm.groupList[0].GroupID;
                }
                return vm.groupList;
            })
        }

        function getNationList() {
            return nationFactory.getNations().then(function (data) {
                vm.nationList = data;
                return vm.nationList;
            })
        }

        function getMatchList() {
            return matchFactory.getMatchList().then(function (data) {
                vm.matchList = data;
                return vm.matchList;
            })
        }

        function selectGroup (id) {
            vm.selectedGroupID = id;
        }

        function showDetail(id) {
            vm.selectedNationID = id;
            vm.nationMatchList = $filter('filter')(vm.matchList, { NationID: id }, true);
        }

        function groupFilterFn(n) {
            //$scope.data.nations={}
            return vm.selectedGroupID == null || n.GroupID == vm.selectedGroupID;
        }
        function nationEdit(id) {
            $state.go('edit-nation', { groupid: vm.selectedGroupID, nationid: id });
        }
       
        function newMatch() {
            $state.go('new-match-nation', {groupid: vm.selectedGroupID, nationid: vm.selectedNationID });
        }
        function newNation() {
            $state.go('new-nation', {groupid: vm.selectedGroupID, nationid:0 });
        }
        
    }
})();

