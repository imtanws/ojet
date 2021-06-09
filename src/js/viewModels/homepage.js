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
  'ojs/ojoption',  'ojs/ojswitch','ojs/ojbutton'], function(oj, ko, $, service) {

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
        service.getHomepageList().then(function(res) {
          console.log(res)
        })
        var data = [{name: 'Settings', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8},
                {name: 'Tools', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8},
                {name: 'Base', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8},
                {name: 'Environment', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8},
                {name: 'Security', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8},
                {name: 'Tools', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8},
                {name: 'Base', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8},
                {name: 'Environment', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8},
                {name: 'Security', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8},
                {name: 'Tools', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8},
                {name: 'Base', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8},
                {name: 'Environment', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8},
                {name: 'Security', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8}
               ];
        self.dataProvider = new oj.ArrayDataProvider(data, 
             {keys: data.map(function(value) {
                 return value.name;
             })}); 
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
