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

        //show Adding form
        $scope.addFormShow = true;
        //hide editing form
        $scope.editFormShow = false;

        // add contactRef array to the scope it be used in the ng-repeat
        $scope.contactRef = contacts;

        // a method to create new contact
        $scope.addContact = function () {
            // calling $add
            // it saves the changes to our database!
            $scope.contactRef.$add({
                name: $scope.name,
                email: $scope.email,
                phone: $scope.phone
            }).then(function (ref) {
                //empty the fields
                $scope.name = '';
                $scope.email = '';
                $scope.phone = '';
            });

        }

        //a method to show the edit contact form and recover id name email phone
        $scope.showEditContact = function (contact) {
            //hide add form
            $scope.addFormShow = false;
            //show edit form
            $scope.editFormShow = true;

            $scope.id = contact.$id;
            $scope.name = contact.name;
            $scope.email = contact.email;
            $scope.phone = contact.phone;
        }

        //a method to delete contact
        $scope.removeContact = function (contact) {
            $scope.contactRef.$remove(contact);
        }

        //a method to edit a contact
        $scope.editContact = function (contact) {
            var id = $scope.id;

            //recover existing parameters
            var record = $scope.contactRef.$getRecord(id);

            //put new parameters
            record.name = $scope.name;
            record.email = $scope.email;
            record.phone = $scope.phone;

            var ref = new Firebase("https://contact-ebec2.firebaseio.com/contacts");
            //save the modif
            $scope.contactRef.$save(record).then(function (ref) {
                console.log(ref.key);

                //empty the fields
                $scope.name = '';
                $scope.email = '';
                $scope.phone = '';
            })

            //hide edit form
            $scope.editFormShow = false;
            //show add form
            $scope.addFormShow = true;

        }
    }]);
