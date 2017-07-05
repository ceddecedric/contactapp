'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'firebase',
    'myApp.contacts'
])
    .config(function () {
        var config = {
            apiKey: "AIzaSyBZfXCedL9eZhLK3DqebdCHLTItxViDB7Q",
            authDomain: "contact-ebec2.firebaseapp.com",
            databaseURL: "https://contact-ebec2.firebaseio.com",
            storageBucket: "contact-ebec2.appspot.com",
            messagingSenderId: "146579399037"
        };
        firebase.initializeApp(config);
    })

    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      $routeProvider.otherwise({redirectTo: '/contacts'});
    }]);