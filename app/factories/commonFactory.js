angular.module("fifa14app").factory("commonFactory", commonFactory);

function commonFactory() {

    var service = {
        getBaseUrl: getBaseUrl,
    };

    return service;

    function getBaseUrl() {
        var re = new RegExp(/^.*\//);
        return re.exec(window.location.href);
    }
}