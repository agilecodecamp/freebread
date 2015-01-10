app.controller('breadListCtrl', ['$scope', 'breads', function($scope, breads) {
  $scope.breads = [];

  function getBreads() {
    breads.getBreads(function dataDone(newBreads) {
      console.log(newBreads);
      $scope.breads = $scope.breads.concat(newBreads);
      $scope.$digest();
    });
  }

  // reload list
  $scope.reload = function reload() {
    $scope.breads = [];
    getBreads();
  };

  // initial breads
  getBreads();
}]);