(function () {
    "use strict";

    angular.module(AppName).component("aboutPageHome", {
        bindings: {},
        templateUrl: "/scripts/components/views/aboutPageHomeView.html",
        controller: function (requestService, $scope, $window, $filter) {
            var vm = this;
            vm.$onInit = _init;
            vm.allAbouts = [];
            vm.pageNumber = 1;
            vm.pageQuantity;
            vm.pageOver = _pageOver;
            vm.getAllAbouts = _getAllAbouts;

            function _init() {
                _getAllAbouts(vm.pageNumber);
            }
            
            function _getAllAbouts(page) {
                requestService.ApiRequestService("get", "\/api/AboutPages/Page/" + page)
                    .then(function (response) {
                        vm.allAbouts = [];
                        vm.allAbouts = response.items;
                        vm.pageQuantity = response.items[0].pageQuantity;
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            }

            function _pageOver(page) {

                if (page >= 1 && page <= vm.pageQuantity) {
                    vm.pageNumber = page;

                    _getAllAbouts(page);
                }
            }
        }
    })
})();
