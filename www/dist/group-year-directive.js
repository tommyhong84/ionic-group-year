/**
 * Created by tommy on 2016/7/9.
 */
(function (angular) {
  'use strict';
  /**
   * version 0.0.1
   */
  angular.module('group-year', []).directive('groupYear',
    ['$timeout', '$ionicScrollDelegate', function ($timeout, $ionicScrollDelegate) {
      return {
        restrict: 'EA',
        scope: {
          dataSource: '='
        },
        templateUrl: 'dist/group-year.html',
        link: function ($scope) {
          /*
          * toggle
          * */
          $scope.toggleGroup = function(group) {
            group.show = !group.show;
          };
          $scope.isGroupShown = function(group) {
            return group.show;
          };
          /*
           * buildGroup
           * */
          function buildGroup(){
            var yearGroups = [];
            $scope.dataSource.forEach(function (item) {
              var groupName = new Date(item.id).getFullYear();
              var hasGroup = false;
              yearGroups.forEach(function (group) {
                if (group.name === groupName) {
                  hasGroup = true;
                  group.children.push(item);
                }
              });
              if (!hasGroup) {
                yearGroups.push({
                  name: groupName,
                  cls:groupName,
                  children: [item]
                });
              }
            });
            return yearGroups;
          }
          /*
          * init
          * */
          function init() {
            var yearGroups=buildGroup();
            if(yearGroups
                &&angular.isArray(yearGroups)
                &&yearGroups.length>0){

              $scope.curGroupName=yearGroups[0].name;
              $scope.yearGroups = yearGroups;

            }
          }
          init();

        }
      };
    }]);
})(angular);
