﻿'use strict';

var controllers = angular.module('app.controllers', []);

// Controllers
controllers.controller('TodoList_ListCtrl', function ($scope, $location, TodoListFactory) {
    // List
    $scope.todoLists = TodoListFactory.getAll();

    // Delete
    $scope.removeFromTodoList = function (todoListId) {
        if (!confirm('Confirm delete')) {
            return;
        }

        // Remove
        TodoListFactory.remove({ id: todoListId }, {}, function (data) {
            // Remove from view
            for (var i in $scope.todoLists) {
                if ($scope.todoLists[i].Id == todoListId) {
                    $scope.todoLists.splice(i, 1);
                }
            }
        });
    };
});

controllers.controller('TodoList_CreateCtrl', function ($scope, $location, TodoListFactory) {
    $scope.submitted = false;
    $scope.addTodoList = function () {
        
        if($scope.form.$valid) {
             // Add + redirect to home
            TodoListFactory.add({}, $scope.todoList, function (data) {
                $location.path('/');
            })
            //catch error from server
            .$promise.catch(
                function( error ){
                    $scope.serverError = error["data"]["ModelState"]["model.Name"].toString();
            });  
        } else {
            $scope.submitted = true;
        }
       
    };
    
    $scope.minLength = 3;
    $scope.maxLength = 50;
    $scope.lengthError = "The length should be between 3 and 50 characters!";
    $scope.text = "My cool list";
});

controllers.controller('TodoList_EditCtrl', function ($scope, $location, $routeParams, TodoListFactory) {
    $scope.todoList = TodoListFactory.getOne({ id: $routeParams.id });

    $scope.editTodoList = function () {
        // Add + redirect to home
        TodoListFactory.edit({ id: $scope.todoList.Id }, $scope.todoList, function (data)
        {
            $location.path('/');
        });
        TodoList.post($scope.todoList)
        
    };    
});