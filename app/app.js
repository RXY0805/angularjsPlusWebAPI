angular.module('fifa14app', ['ui.router', 'ui.bootstrap', 'ngFileUpload']).config(routeConfig);

routeConfig.$inject = ['$stateProvider', '$urlRouterProvider','$locationProvider'];

function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('siteInfo', {
            url: '/',
            templateUrl: '/app/views/about/info.html',
        })
        .state('groups', {
            url: '/groups',
            params: {
                groupid: null,
            },
            templateUrl: '/app/views/group/group.html',
        })
         .state('new-nation', {
             url: '/new-nation',
             params: {
                 groupid: null,
             },
             templateUrl: '/app/views/nation/edit.html',
         })
          .state('edit-nation', {
              url: '/edit-nation',
              params: {
                  groupid: null,
                  nationid: null,
              },
              templateUrl: '/app/views/nation/edit.html',
          })
         .state('new-match-nation', {
             url: '/new-match-nation',
             params: {
                 groupid:null,
                 nationid: null,
             },
             templateUrl: '/app/views/match/edit.html',
         })
    $locationProvider.html5Mode(true);
}




//angular.module("fifa14app", ["ngRoute"])
//    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

//        //var baseSiteUrlPath = $("base").first().attr("href");
//        var baseTemplateUrl = "/app/views/";

//        $routeProvider.when("/groups", {
//            templateUrl: "/app/views/group/group.html"
//        }).
//        when("/new-nation", {
//            templateUrl: "/app/views/nation/edit.html"
//        }).
//        when("/edit-nation/:id", {
//            templateUrl: "/app/views/nation/edit.html"
//        }).
//        when("/new-match/:gid", {
//            templateUrl: "/app/views/match/edit.html"
//        }).
//        when("/test", {
//            templateUrl: "/app/views/test.html"
//        }).
//        otherwise({
//            templateUrl: "/app/views/group/group.html",
//        });
//        //$locationProvider.html5Mode(true);
//    }])



