angular.module("fifa14app")
 .controller("nationController", nationController);

nationController.$inject = ['nationFactory', 'groupFactory','matchFactory','commonFactory', '$stateParams', '$location', '$state', '$modal','$filter'];

function nationController(nationFactory, groupFactory, matchFactory, commonFactory,$stateParams, $location, $state, $modal, $filter) {
    var vm = this;
   
    var nationid = $stateParams.nationid;
    var groupid = $stateParams.groupid;
    var existNationList = [];
    var isEdit = (nationid > 0 ? true :false);

    //ng-model
    vm.currentNation = {};
    vm.currentGroup = {};
    vm.folderName = "nation";
    vm.uploadedFilePath = null;

    //ng-Method
    vm.save = save;
    vm.openDeleteDialogue = openDeleteDialogue;
    vm.back = back;
    vm.openUploadDialog = openUploadDialog;
    var hostUrl= commonFactory.getBaseUrl();
    var path =hostUrl+ 'app/images/' + vm.folderName + '/';
    Initialize();
   
    function Initialize() {
        if (nationid > 0) {
            LoanCurrentNation(nationid);
        }
        else {
            LoadGroupDetail(groupid);
        }
        LoandExistNations(groupid, nationid);
    }

    function LoadGroupDetail(id) {
        return groupFactory.getGroupList().then(function (data) {
            var result = $filter('filter')(data, { GroupID: id }, true);
            vm.currentGroup = result[0];
            return vm.currentGroup;
        })
    }

    function LoanCurrentNation(id) {
        nationFactory.getNationById(id).success(function (data) {
            vm.nation = data;
            vm.currentGroup = data.Group;
        })
    }

    function LoandExistNations(groupid,nationid) {
        return nationFactory.getNations().then(function (data) {
            existNationList = data;
            if (nationid > 0) {
                var result = $filter('filter')(data, { NationID: nationid });
                vm.currentNation = result[0];
                vm.uploadedFilePath = path + vm.currentNation.FlagUrl;
                existNationList.splice(existNationList.indexOf(vm.currentNation), 1);
            }
        })
    }

    function openUploadDialog(size) {
        var modalInstance = $modal.open({
            templateUrl: '/app/views/utility/upload.html',
            controller: 'uploadController as vm',
            size: size,
            resolve: {
                folderName: function () {
                    return vm.folderName;
                }
            }
        });

        modalInstance.result.then(function (data) {
            vm.currentNation.FlagUrl = data;
            vm.uploadedFilePath = path + data;
        }, function () {
            //alert('Modal dismissed at: ' + new Date());
        });
    }

    function openDeleteDialogue(size) {
        var message ='all the matches which team '+vm.currentNation.Name+' played will be removed.';
        var modalInstance = $modal.open({
            templateUrl: '/app/views/utility/yesno.html',
            controller: 'yesnoController as vm',
            size: size,
            resolve: {
                message: function () {
                    return message;
                }
            }
        });

        modalInstance.result.then(function (isConfirmed) {
            if (isConfirmed) {
                removeMatchesByNationID(nationid).then(function(data){
                    nationFactory.removeNation(nationid).then(function (data) {
                        BackToGroupView(groupid);
                    });
                })
            }
        }, function () {
            console.log('dialogue for removing nation');
        });
    }

    function removeMatchesByNationID(id) {
        var oppositeTeamRemovedMatchDetail = [];

        return matchFactory.getMatchList().then(function (data) {
            var matchesList = $filter('filter')(data, { NationID: id }, true);

            for (var i = 0; i < matchesList.length; i++) {
                var oppositeTeamLostGoal = matchesList[i].Score;
                var playedMatchesList = $filter('filter')(data, { MatchID: matchesList[i].MatchID }, true);
                var result = $filter('filter')(playedMatchesList, { NationID: '!' + id });
                var oppositeTeam = result[0];
                oppositeTeamRemovedMatchDetail.push({ nationid: oppositeTeam.NationID, goal: oppositeTeam.Score, lostGoal: oppositeTeamLostGoal });
                
                if (playedMatchesList) {
                    for (var m = 0; m < playedMatchesList.length; m++) {
                        matchFactory.removePlayedMatch(playedMatchesList[m].PlayedMatchID);
                    }
                }
            }
          
            for (var i = 0; i < matchesList.length; i++) {
                matchFactory.deleteMatch(matchesList[i].MatchID);
            }

            if (oppositeTeamRemovedMatchDetail.length > 0) {
                for (var i = 0; i < oppositeTeamRemovedMatchDetail.length; i++) {
                    var removedMatch = oppositeTeamRemovedMatchDetail[i];
                    UpdateTeamPoints(removedMatch.nationid, removedMatch.goal, removedMatch.lostGoal, false);
                }
            }
        })
    };
        
    function UpdateTeamPoints(id, goal, lostGoal, isNewMatch) {
        var result = $filter('filter')(existNationList, { NationID: id });
        var updatedNation= result[0];
        var adjust = (isNewMatch ? 1 : -1);

        updatedNation.GoalCount += parseInt(adjust * goal);
        updatedNation.LostGoalCount += parseInt(adjust * lostGoal);

        if (goal > lostGoal) {
            updatedNation.WinCount += adjust;
        }
        if (goal == lostGoal) {
            updatedNation.DrawCount += adjust;
        }
        if (goal < lostGoal) {
            updatedNation.LostCount += adjust;
        }

        nationFactory.updateNation(updatedNation, id).then(function (data) {
            console.log('update rest team points')
        });
    }

    function save() {
        var isExist = false;
        if (existNationList.length>0) {
            for (var i = 0; i < existNationList.length; i++) {
                if (existNationList[i].Name.toUpperCase() === vm.currentNation.Name.toUpperCase()) {
                    isExist = true;
                    break;
                }
            }
        }

        if (isExist) {
            openNoticeDialogue('md');
        }
        else{
            if (isEdit) {
                nationFactory.updateNation(vm.currentNation, nationid).then(function (data) {
                    BackToGroupView(groupid);
                })
            }
            else
            {
                vm.currentNation.GroupID = groupid;
                nationFactory.addNation(vm.currentNation).success(function (data) {
                    BackToGroupView(groupid);
                })
            }
        }
    }
  
    function openNoticeDialogue(size) {
        var modalInstance = $modal.open({
            templateUrl: '/app/views/utility/notice.html',
            controller: 'noticeController as vm',
            size: size,
            resolve: {
                information: function () {
                    return 'team ' + vm.currentNation.Name + ' is exist';
                }
            }
        });
    }
  
    function back() {
        BackToGroupView(groupid);
    }
    function BackToGroupView(gid) {
        $state.go('groups', { groupid: gid });
    }
};