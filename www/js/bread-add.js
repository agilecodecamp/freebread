app.controller('addBreadCtrl', ['$scope', 'cameraFactory', function ($scope, cameraFactory) {

	$scope.breadData = {};

	function getPhoto (way) {
		if (!cameraFactory[way]) {
			return;
		}

		cameraFactory[way](function getPhoto (data, error) {
			if (data) {
				$scope.breadData.img = data;
				$scope.$digest();
			} else {
				console.error(error);
			}
		});
	}

	$scope.getPhoto = getPhoto;

}]);