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

  function set (newBread, callback) {
    var Bread = Parse.Object.extend('Bread');
    var bread = new Bread();

    if (!newBread.title) {
      callback(null, {
        style: 'assertive',
        message: 'You need input some title'
      });
      return;
    } else if (!newBread.img) {
      callback(null, {
        style: 'assertive',
        message: 'You need select a photo'
      });
      return;
    }

    bread.save(
      newBread, {
        success: function (savedbread) {
          callback(savedbread.toJSON(), {
            style: 'positive',
            message: 'Upload success'
          });
        },
        error: function (savedbread, error) {
          error.style = 'assertive';
          callback(null, error);
        }
    });
  }

  return {
    getBreads: get,
    addBread: set
  };
}]);