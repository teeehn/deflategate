"use strict"

var app = angular.module("calcApp", []);

app.controller("calc", ['$scope', function($scope){
  // initial values
  var init = {
      t2: 50, // final measurement temperature F
      dp: 2, // pressure below spec of 12.5 psi
      p1: 12.5 // initially measured pressure
  }; 
  // expose initial values to scope
  $scope.reset = function(){
    $scope.t2 = init.t2;
    $scope.dp = init.dp;
    $scope.p1 = init.p1;
    $scope.changed = 0;
  };
  // initialize
  $scope.reset();

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
        dpg = Math.round(100*(p1 - pf)/p1),
        dpa = Math.round(100*(p1 - pf)/(p1 + 14.7));
    return {"gauge": dpg,"abs":dpa};
  };

}]);
