/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

// settins viewModel of the app

'use strict';
define(['ojs/ojcore',  'knockout', 'jquery', 'dataService', 'appController', 'ojs/ojknockout', 'promise', 
  'ojs/ojlistview', 'ojs/ojarraydataprovider', 'ojs/ojmenu', 
  'ojs/ojoption',  'ojs/ojswitch','ojs/ojbutton'], function(oj, ko, $, service, app) {

    function settingsViewModel() {
        var self = this;
      
        this.moduleSettings = {
            name: 'homepage/carousel'
        }
        this.notice = {
            name: 'homepage/notification',
            params: {
                msg: '今天利息上涨百分之十'
            }
        }
        this.pullSettings = {
          name: 'homepage/pull'
        }

        self.data = ko.observableArray()
        function processProduct(res) {
          self.data(res.data)
        }
        
        service.getHomepageList().then(function(res) {
          console.log(res)
          if (res.code === 1) {
            processProduct(res)
          }
        })

        self.dataProvider = ko.computed(function() {
          return new oj.ArrayDataProvider(self.data()); 
        })
        self.selectedMenuItem = ko.observable("None selected yet");
        self.launchedFromItem = ko.observable("None launched yet");        
        self.show = function() {
          try{
            navigator.contacts.pickContact(function(contact){
            alert('The following contact has been selected:' + JSON.stringify(contact));
          },function(err){
            alert('Error: ' + JSON.stringify(err));
          });
          } catch(err) {
            alert(JSON.stringify(err))
          }
        }
    }

    return settingsViewModel;
});
