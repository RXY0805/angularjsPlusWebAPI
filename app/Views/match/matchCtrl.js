angular.module("fifa14app")
    .controller("matchController", matchController);
matchController.$inject = ['nationFactory', 'matchFactory', '$stateParams', '$filter', '$state','$modal'];

function matchController(nationFactory, matchFactory, $stateParams, $filter, $state, $modal) {
    var vm = this;
    var currentNationID = $stateParams.nationid;
    var currentGroupID = $stateParams.groupid;

    vm.match = {};
    vm.FirstTeam = { };
    vm.SecondTeam = {};
    vm.oppositeTeamList = {};
    vm.match.MatchDate = '2015-06-25';
    playedNationIDList = [];

    vm.save = save;
    activate();

    function activate() {
        getPlayedNationIDList().then(function(data){
                getOppositeTeamList();
            }
        );
    }

    function getOppositeTeamList() {
        return nationFactory.getNations().then(function (data) {
            var nationList = $filter('filter')(data, { GroupID: currentGroupID });
            var result = $filter('filter')(nationList, { NationID: currentNationID });
            vm.FirstTeam = result[0];
            vm.oppositeTeamList = $filter('filter')(nationList, { NationID: '!' + currentNationID });

            if (playedNationIDList.length > 0) {
                for (var i = 0; i < playedNationIDList.length; i++) {
                    var playedTeam = $filter('filter')(vm.oppositeTeamList, { NationID: playedNationIDList[i]});
                    vm.oppositeTeamList.splice(vm.oppositeTeamList.indexOf(playedTeam[0]), 1);
                }
            }
            if (vm.oppositeTeamList.length > 0) {
                vm.SecondTeam = vm.oppositeTeamList[0];
                return vm.oppositeTeamList;
            }
            else {
                noTeamAvailable();
            }
            
        })
    }
    function noTeamAvailable() {
        var modalInstance = $modal.open({
            templateUrl: '/app/views/utility/notice.html',
            controller: 'noticeController as vm',
            size: 'md',
            resolve: {
                information: function () {
                    return 'there is NO team available, please create new team';
                }
            }
        });

        modalInstance.result.then(function () {
            BackToGroupView(currentGroupID);
        })
    }

    function getPlayedNationIDList() {
        return matchFactory.getMatchList().then(function (data) {
            var matchList = data;
            var playedMatchList = $filter('filter')(data, { NationID: currentNationID }, true);

            for (var i = 0; i < playedMatchList.length; i++) {

                var playedTeam = $filter('filter')(matchList, { MatchID: playedMatchList[i].MatchID }, true);

                if (playedTeam) {

                    for (var m = 0; m < playedTeam.length; m++)
                    {
                        if (playedTeam[m].NationID != currentNationID) {
                            playedNationIDList.push(playedTeam[m].NationID);
                        }
                    }
                }
            }
            return playedNationIDList;
        })
    }

    function selectNation(id) {
        vm.selectedNationID = id;
        vm.nationMatchList = $filter('filter')(vm.matchList, { NationID: id }, true);
    }

    function save() {
        matchFactory.addMatch(vm.match).then(function (data) {
            vm.FirstTeam.MatchID = data.MatchID;
            vm.SecondTeam.MatchID = data.MatchID;
            var goal = vm.FirstTeam.Score;
            var lostGoal = vm.SecondTeam.Score;
            var isNewMatch = true;

            matchFactory.addTeam(vm.FirstTeam).then(function (data) {
                UpdateTeamPoints(vm.FirstTeam, goal, lostGoal, true,false);
            })
            matchFactory.addTeam(vm.SecondTeam).then(function (data) {
                UpdateTeamPoints(vm.SecondTeam, lostGoal, goal, true,true);
            })
        })
    }

    function BackToGroupView(gid) {
        $state.go('groups', { groupid: gid });
    }

    function UpdateTeamPoints(nation, goal, lostGoal, isNewMatch,backToGroupPage) {
        var adjust=(isNewMatch?1:-1);

        nation.GoalCount += parseInt(adjust * goal);
        nation.LostGoalCount += parseInt(adjust * lostGoal);

        if (goal > lostGoal) {
            nation.WinCount += adjust;
            nation.Points += (adjust*3);
        }
        if (goal == lostGoal) {
            nation.DrawCount += adjust;
            nation.Points += adjust;
        }
        if (goal < lostGoal) {
            nation.LostCount += adjust;
        }

        nationFactory.updateNation(nation, nation.NationID).then(function (data) {
            if (backToGroupPage) {
                BackToGroupView(currentGroupID);
            }
        });
    }
};