angular.module("fifa14app").factory('groupFactory', groupFactory);

groupFactory.$inject = ['$http'];

function groupFactory($http) {
    return {
        getGroupList: getGroupList
    };

    function getGroupList() {
        return $http.get("/api/groups/")
             .then(getGroupsComplete)
             .catch(getGroupsFailed);

        function getGroupsComplete(response) {
            return response.data;
        }

        function getGroupsFailed(error) {
           // logger.error('XHR Failed for getAvengers.' + error.data);
        }
    }
}