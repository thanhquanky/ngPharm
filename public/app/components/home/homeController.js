ngPharm.controller('HomeController',
    [function() {
        var that = this;
        this.carousel = {
            interval: 1000,
            slides: [{
              image: '../../assets/images/claritin.png',
              text: 'This is claritin, an Anti-histanmine'
            }, {
              image: '../../assets/images/amoxicillin.png',
              text: 'This is amoxicillin, an Anti-biotic'
            }, {
              image: '../../assets/images/doracin.png',
              text: 'This is claritin, an Anti-biotic'
            }]
        }
    }]);

/*
ngPharm.controller('CarouselCtrl', function ($scope) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: 'http://placekitten.com/' + newWidth + '/300',
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=0; i<4; i++) {
    $scope.addSlide();
  }
})
*/
