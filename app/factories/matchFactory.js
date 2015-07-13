angular.module("fifa14app").factory('matchFactory', matchFactory);

matchFactory.$inject = ['$http', '$q'];

function matchFactory($http,$q) {
    var playedMatchUrl = "/api/playedMatches/";
    var service = {
        addMatch: addMatch,
        deleteMatch:deleteMatch,
        addTeam: addTeam,
        removePlayedMatch: removePlayedMatch,
        getMatchList: getMatchList
    };

    return service;

    function addMatch(match) {
        return $http.post("/api/matches/", match)
               .then(addMatchComplete)
                .catch(addMatchFailed);

        function addMatchComplete(response) {
            return response.data;
        };
        function addMatchFailed() { };
    }
    function deleteMatch(id) {
        return $http.delete("/api/matches/" + id).then(deleteMatchComplete)
                .catch(deleteMatchFailed);

        function deleteMatchComplete(response) {
            return response.data;
        };
        function deleteMatchFailed() {
            console.log('Failed while remove match');
        };
    }
    
    function addTeam(team) {
        return $http.post(playedMatchUrl, team);
    }
    

    function removePlayedMatch(id) {
        var def = $q.defer();
        $http.delete(playedMatchUrl + id).success(function (data) {
            def.resolve(data);
            console.log('success remove played match');
        })
        .error(function () {
            def.reject("Failed to remove match");
            console.log('error while removing played match');
        });
        return def.promise;
    }

    function getMatchList() {
        return $http.get(playedMatchUrl)
              .then(getMatchesComplete)
                 .catch(getMatchesFailed);

        function getMatchesComplete(response) {
            return response.data;
        };
        function getMatchesFailed(error) {
            // error handler
        };
    }
};