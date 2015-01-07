app.controller('breadListCtrl', ['$scope', 'breads', function ($scope, breads) {
  $scope.breads = [];
  
  breads.getBreads(function dataDone (newBreads) {
    console.log(newBreads);
    $scope.breads = $scope.breads.concat(newBreads);
    $scope.$digest();
  });
}]);