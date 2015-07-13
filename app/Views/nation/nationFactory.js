    angular.module("fifa14app").factory("nationFactory", nationFactory);
    nationFactory.$inject = ['$http','$q'];

    function nationFactory($http, $q) {

        var service = {
            getNations: getNations,
            getNationById: getNationById,
            addNation: addNation,
            updateNation: updateNation,
            removeNation: removeNation
        };

        return service;
    
        function getNations() {
            return $http.get("/api/nations/")
              .then(getNationsComplete)
                 .catch(getNationsFailed);

            function getNationsComplete(response) {
                return response.data;
            };
            function getNationsFailed(error) {
                // error handler
            };
        }
        function getNationById(id) {

            return $http.get("/api/nations/" + id);
        }

        function addNation(nation) {
            return $http.post("/api/nations/", nation);
        }

        function updateNation(nation, id) {
            var def = $q.defer();
            $http.put("/api/nations/" + id, nation).success(function (data) {
                def.resolve(data);
                console.log('success updating nation');
            })
            .error(function () {
                def.reject("Failed to update nation");
                console.log('error while updating nation');
            });
            return def.promise;
        }

        function removeNation(id) {
            return $http.delete("/api/nations/" + id);
        }
    }


