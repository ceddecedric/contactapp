'use strict';

angular.module('myApp.contacts', [
    'ngRoute',
    'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

    .factory("contacts", ["$firebaseArray",
        function($firebaseArray) {
            // create a reference to the database location where we will store our data
            var ref = new Firebase("https://contact-ebec2.firebaseio.com/contacts");
            return $firebaseArray(ref);
        }
    ])

.controller('ContactsCtrl', ['$scope','contacts', function($scope, contacts) {


    $scope.addFormShow = true;
    $scope.editFormShow = false;

    // we add chatMessages array to the scope to be used in our ng-repeat
    $scope.contactRef = contacts;

    // a method to create new messages; called by ng-submit
    $scope.addContact = function () {
        // calling $add on a synchronized array is like Array.push(),
        // except that it saves the changes to our database!
        $scope.contactRef.$add({
            name: $scope.name,
            email: $scope.email,
            phone: $scope.phone
        }).then(function (ref) {

        $scope.name = '';
        $scope.email = '';
        $scope.phone = '';
    });

    }

    $scope.showEditContact = function (contact) {
        $scope.addFormShow = false;
        $scope.editFormShow = true;

        $scope.id = contact.$id;
        $scope.name = contact.name;
        $scope.email = contact.email;
        $scope.phone = contact.phone;
    }
    
    $scope.removeContact = function (contact) {
        $scope.contactRef.$remove(contact);
    }

    $scope.editContact = function (contact) {
        var id = $scope.id;

        var record = $scope.contactRef.$getRecord(id);

        record.name = $scope.name;
        record.email = $scope.email;
        record.phone = $scope.phone;


        var ref = new Firebase("https://contact-ebec2.firebaseio.com/contacts");
        $scope.contactRef.$save(record).then(function (ref) {
            console.log(ref.key);

            $scope.name = '';
            $scope.email = '';
            $scope.phone = '';
        })

        $scope.editFormShow = false;
        $scope.addFormShow = true;

    }
}]);
