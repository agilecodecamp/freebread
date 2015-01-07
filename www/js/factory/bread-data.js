app.factory('breads', [function () {
  var skipNumber = 0;
  var limitNumber = 10;
  
  function get (callback) {
    var Bread = Parse.Object.extend('Bread');
    var query = new Parse.Query(Bread);
    query.skip(skipNumber);
    query.limit(limitNumber);
    query.descending('updateAt');
    query.find({
      success: function(breads) {
        var datas = [];
        breads.forEach(function getData (element) {
          datas.push(element.toJSON());
        });
        callback(datas);
      },
      error: function(object, error) {
        console.log(error);
        callback(null, error);
      }
    });
  }

  return {
    getBreads: get
  };
}]);