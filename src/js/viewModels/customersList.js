/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';
define(['ojs/ojcore', 'knockout', 'jquery',
        'dataService',
        'appController',
        'persist/persistenceStoreManager',
        'ojs/ojknockout',
        'ojs/ojdatacollection-common',
        'ojs/ojindexer',
        'ojs/ojanimation', 'ojs/ojselectcombobox'], function(oj, ko, $, data, app, persistenceStoreManager){
  function customersViewModel() {
    var self = this;

    self.handleActivated = function(params) {
      // retrieve parent router
      self.parentRouter = params.valueAccessor().params['ojRouter']['parentRouter'];

      app.refreshCustomers = function (response) {
        debugger
        processCustomers(response);
      }
    };

    function processCustomers(response) {

      var result = JSON.parse(response).result;

      persistenceStoreManager.openStore('customers').then(function (store) {
        debugger
        store.keys().then(function (keys) {
          result.forEach(function (customer) {
            if(keys.indexOf(customer.id) > -1) {
              customer.cached = true;
            } else {
              customer.cached = false;
            }
          })

          var formatted = [];
          var keys = [];

          // format data for indexer groups
          for(var i=0; i<result.length; i++) {
            var firstNameInitial = result[i].firstName.charAt(0).toUpperCase();
            if(keys.indexOf(firstNameInitial) > -1) {
              formatted[keys.indexOf(firstNameInitial)].children.push({attr: result[i]});
            } else {
              keys.push(firstNameInitial);
              formatted.push({
                attr: { id: firstNameInitial },
                children: [{attr: result[i]}]
              });
            }
          }

          // sort by firstName initial
          formatted.sort(function(a, b) {
            return (a.attr.id > b.attr.id) ? 1 : (a.attr.id < b.attr.id) ? -1 : 0;
          });

          // sort by firstName then lastName within each group
          formatted.forEach(function(group) {

            group.children.sort(function(a, b) {
              // sort by first name
              if (a.attr.firstName > b.attr.firstName) {
                return 1;
              } else if (a.attr.firstName < b.attr.firstName) {
                return -1;
              }

              // else sort by last name
              return (a.attr.lastName > b.attr.lastName) ? 1 : (a.attr.lastName < b.attr.lastName) ? -1 : 0;
            });
          });

          self.allCustomers(formatted);
        });
      })
    };

    self.handleBindingsApplied = function(info) {
      if (app.pendingAnimationType === 'navParent') {
        app.preDrill();
      }
    };

    self.handleTransitionCompleted = function(info) { 
      
      var listView = document.getElementById('customerlistview');
      oj.Context.getContext(listView).getBusyContext().whenReady().then(function () {
          self.getIndexerModel();
          
          // adjust content padding top
          app.appUtilities.adjustContentPadding();
    
          // adjust padding-bottom for indexer
          var topElem = document.getElementsByClassName('oj-applayout-fixed-top')[0];
          var contentElem = document.getElementById('indexer').getElementsByTagName('ul')[0]; //document.getElementById('indexer');
    
          contentElem.style.paddingBottom = topElem.offsetHeight+'px';
          contentElem.style.position = 'fixed';
          contentElem.style.height = '100%';
          
      }); 
      

      if (app.pendingAnimationType === 'navParent') {
        app.postDrill();
      }

      // invoke zoomIn animation on floating action button
      var animateOptions = { 'delay': 0, 'duration': '0.3s', 'timingFunction': 'ease-out' };
      oj.AnimationUtils['zoomIn']($('#addCustomer')[0], animateOptions);

    };

    self.scrollElem = document.body;

    self.allCustomers = ko.observableArray();
    self.nameSearch = ko.observable();
    self.noResults = ko.observable(false);
    
    self.indexerModel = ko.observable(null);

    self.itemOnly = function(context) {
      return context['leaf'];
    };

    self.selectTemplate = function(context) {
      var renderer = oj.KnockoutTemplateUtils.getRenderer(context.leaf ? 'item_template' : 'group_template', true);
      return renderer.call(this, context)
    };

    self.getIndexerModel = function() {
      if (self.indexerModel() == null) {
        var listView = document.getElementById('customerlistview');
        var indexerModel = listView.getIndexerModel();
        self.indexerModel(indexerModel);
      }
    };

    // load customers
    data.getCustomers().then(function(response) {
      processCustomers(response);
    });

    // filter customers
    self.customers = ko.computed(function() {

      if (self.nameSearch() && self.allCustomers().length > 0) {
        var filteredCustomers = [];

        var token = self.nameSearch().toLowerCase();

        self.allCustomers().forEach(function (node) {
          node.children.forEach(function (leaf) {
            if (leaf.attr.firstName.toLowerCase().indexOf(token) === 0 || leaf.attr.lastName.toLowerCase().indexOf(token) === 0) {
              filteredCustomers.push(leaf);
            }
          });
        });
        self.noResults(filteredCustomers.length == 0);
        return new oj.JsonTreeDataSource(filteredCustomers);

      } else {
        self.noResults(false);
        return new oj.JsonTreeDataSource(self.allCustomers());
      }

    });

    // go to create customer page
    self.goToAddCustomer = function() {
      self.parentRouter.go('customerCreate');
    };

    // handler for drill in to customer details
    self.optionChange = function(event) {
      var value = event.detail.value;
      if (value && value[0]) {
        app.pendingAnimationType = 'navChild';
        app.goToCustomer(value[0]);
      }
    };

    self.isSearchMode = ko.observable(false);

    self.goToSearchMode = function() {
      self.isSearchMode(true);
      $("#inputSearch").focus();
    };

    self.exitSearchMode = function() {
      self.isSearchMode(false);
      self.clearSearch();
    };

    self.clearSearch = function() {
      self.nameSearch('');
    };

	}

  return customersViewModel;

});
