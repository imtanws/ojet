'use strict';
define(['ojs/ojcore', 'knockout', 'dataService', 'ojs/ojknockout', 'ojs/ojfilmstrip', 'ojs/ojpagingcontrol'],
function(oj, ko, data){     
    var ViewModel = function(moduleParams){
        var self = this;
        self.pagingModel = ko.observable(null);
        self.images = ko.observableArray([
          {id: 1, src: "http://localhost:8888/images/1516086662411.jpg"},
          {id: 2, src: "http://localhost:8888/images/1516087927856.jpg"},
          {id: 5, src: "http://localhost:8888/images/1516092060120.jpg"},
          {id: 4, src: "http://localhost:8888/images/1516092039899.jpg"},
          ])
        data.getCarousel().then(function(res) {
          console.log(res.data)
        })
        
        function render() {
          var filmStrip = document.getElementById('filmStrip');
            var busyContext = oj.Context.getContext(filmStrip).getBusyContext();
            busyContext.whenReady().then(function (){
              self.pagingModel(filmStrip.getPagingModel());
            });
        }
        self.handleBindingsApplied = function(){
          render()
        };


    }

    return ViewModel;
});