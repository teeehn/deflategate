(function(){
  "use strict"

  var app = angular.module("calcApp", []);

  app.controller("calc", ['$scope', function($scope){
    // initial values
    var init = {
        t2: 50, // final measurement temperature F
        dp: 2, // pressure below spec of 12.5 psi
        p1: 12.5 // initially measured pressure
    }; 
    $scope.tStart = init.t2;
    $scope.dpStart = init.dp;
    $scope.pStart = init.p1;
    $scope.resetP = $scope.resetT = $scope.resetDp = false;
    $scope.resetSliders = function(){     
      $scope.resetP = $scope.resetT = $scope.resetDp = true;
    };

    // calculate t1
    $scope.t1 = function(){
      var t2 = parseFloat($scope.t2),
          dp = parseFloat($scope.dp),
          p1 = parseFloat($scope.p1),
          pf = 12.5 - dp,
          A = p1 + 14.7,
          B = t2 + 459.67,
          C = pf + 14.7;
      return Math.round((A*B/C) - 459.67);       
    };
    
    // calculate percent change in pressure
    $scope.pChange = function(){
      var pf = 12.5 - parseFloat($scope.dp),
          p1 = parseFloat($scope.p1),
          dpg = (Math.round(10*100*(p1 - pf)/p1))/10,
          dpa = (Math.round(10*100*(p1 - pf)/(p1 + 14.7)))/10;
      return {"gauge": dpg,"abs":dpa};
    };


  }]);

  app.directive("slider", [function(){
    return {
      restrict: "A",
      replace: true,
      template: "<div></div>",
      scope: {
        start: "=",
        slideVal: "=",
        reset: "="
      },
      link:   function(scope, elem, attrs){
            $(elem).slider({
              orientation: "horizontal",
              min: (parseInt(10*attrs.min))/10,
              max: (parseInt(10*attrs.max))/10,
              value: scope.start,
              step: .01,
              slide: function(event, ui){
                scope.$apply(function(){
                  scope.slideVal = ui.value;
                });
              }
            });
            scope.slideVal = scope.start;
            scope.setValue = function(newValue){
              $(elem).slider("value", newValue);
            };
            scope.$watch('reset', function(newValue, oldValue){
              scope.setValue(scope.start);
              scope.slideVal = scope.start;
              scope.reset = false;
            });
          }
    };
  }]);
}());

