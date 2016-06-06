'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:commentForm
 * @description
 * # commentForm
 */
angular.module('commentForm', [])
  .directive('commentForm', function () {
    return {
      template: '<form class="commentForm" name="form">' +
                  '<input type="text" placeholder="Your name" ng-model="comment.author" name="author"/>' +
                  '<input type="text" placeholder="Say something..." ng-model="comment.msg" name="msg"/>' +
                  '<input type="submit" value="Post" ng-click="submitComment()"/>' +
                '</form>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.comment = {};
        scope.submitComment = function(){
          var comment = scope.comment;
          comment.timestamp = getTimestamp();
          if (!comment.msg || !comment.author) {
            return;
          }
          scope.$emit('submitted', comment);
          scope.comment = {};
        }

        Number.prototype.padLeft = function(base,chr){
          var  len = (String(base || 10).length - String(this).length)+1;
          return len > 0? new Array(len).join(chr || '0')+this : this;
        }

        function getTimestamp(){
          var timestamp = new Date,
          timestampformat = [(timestamp.getMonth()+1).padLeft(),
                timestamp.getDate().padLeft(),
                timestamp.getFullYear()].join('/') +' ' +
                [timestamp.getHours().padLeft(),
                timestamp.getMinutes().padLeft(),
                timestamp.getSeconds().padLeft()].join(':');

          return timestampformat;
        }
      }
    };
  });
