/**
*/

(function() {

    var ngPharm = angular.module('ngPharm'); 
    var AboutController = function() {
        var vm = this;
        vm.developers = [
            {
                name: "Thanh Ky Quan",
                email: "thanhquanky@gatech.edu",
                linkedin: "https://linkedin.com/in/thanhquanky",
                image: "thanh.png",
                intro: "GT Class of 2015"
            },
            {
                name: "Duc Tran",
                email: "trananhduc1004@gmail.com",
                linkedin: "https://www.linkedin.com/in/trananhduc1004",
                image: "duc.png",
                intro: "GT class of 2017"
            }
        ];
    }
    ngPharm.controller('AboutController', AboutController);

})();
