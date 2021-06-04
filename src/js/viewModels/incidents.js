/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

// This incidents viewModel controls dashboard/list/map tabs.

'use strict';
define(['ojs/ojcore', 'knockout', 'jquery', 'dataService', 'appController', 'ojs/ojknockout', 'ojs/ojpopup', 'ojs/ojrouter', 'ojs/ojarraydataprovider'], function(oj, ko, $, data, app) {

    function incidentsViewModel() {

        var self = this;

        self.showFilterBtn = ko.observable(false);

        self.previousTab = null;

        self.handleActivated = function(params) {
            // setup child router
            var parentRouter = params.valueAccessor().params['ojRouter']['parentRouter'];
              // oj.Router.defaults.urlAdapter = new oj.Router.urlParamAdapter();
  // Change the default location for the viewModel and view files
  // oj.ModuleBinding.defaults.modelPath = 'viewModels/about/';
  // oj.ModuleBinding.defaults.viewPath = 'text!views/about/';
            self.router = parentRouter.createChildRouter('incidentsTab').configure({
                'tabdashboard': { label: 'Dashboard', isDefault: true },
                'tablist': { label: 'Incidents List' },
                'tabmap': { label: 'Map' }
            });
            var router = oj.Router.rootInstance;


            var data = [{id: 1, name: '个人信息', pageId: '#page1', content: 'Mew, Furball, Puss', desc: '1'},
                {id: 2, name: '身份认证', pageId: '#page2', content: 'Add one more', desc: '1'},
                {id: 3, name: '还款计划', pageId: '#page3', content: 'Fried, Shake & Bake, Sautee', desc: '1'},
                {id: 4, name: '预约', pageId: '#page4', content: 'Bedroom to kitchen and back', desc: '1'},
                {id: 5, name: '收藏', pageId: '#page5', content: 'Milk, bread, meat, veggie, can, etc.', desc: '1'},
                {id: 6, name: '帮助中心', pageId: '#page6', content: '', desc: '1'},
                {id: 7, name: '设置', pageId: '#page7', content: 'TBD', desc: '1'}
            ];
            // var routerConfig = {}
            // data.forEach(function(item) {
            //     var stateId = item.id.toString()
            //     routerConfig[stateId] = { label: item.name }
            // })
            // router.configure(routerConfig)
        
            this.dataProvider = new oj.ArrayDataProvider(data, {
                keys:data.map(function(value) {
                    return value.id;
                })
            });
            this.testmodule = ko.pureComputed(function() {
                var stateId = router.stateId()
                if (stateId == 'incidents') {
                    return {
                        name: 'aboutListView',
                        params: {
                            dataProvider: self.dataProvider,
                            gotoContent: self.gotoContent
                        }
                    }
                } else {
                    return {
                        name: 'content',
                        params: {
                            data: 'this id data',
                            
                        }
                    }
                }
            })
            // this.testmodule = {
            //     name: 'aboutListView',
            //     params: {
            //         dataProvider: self.dataProvider
            //     }
            // }
        self.gotoContent = function(event){
            if (event.detail.value !== null){
                // params.scrollPos(document.getElementById('listview').scrollTop);

        // Navigate to the selected item
                parentRouter.go('about');
            }
        }
            self.moduleConfig = ko.pureComputed(function () {
                var tabAnimations = {
                    'navSiblingEarlier': oj.ModuleAnimations.createAnimation({'effect':'slideOut','direction':'start','persist':'all'}, {'effect':'slideIn','direction':'start'}, false),
                    'navSiblingLater': oj.ModuleAnimations.createAnimation({'effect':'slideOut','direction':'end','persist':'all'}, {'effect':'slideIn','direction':'end'}, false)
                };

                var animation = null;

                // determine animation type based on current and previous tab
                switch(self.previousTab) {
                    case 'tabdashboard':
                        animation = tabAnimations['navSiblingEarlier']
                        break;
                    case 'tablist':
                        if(self.router.stateId() === 'tabdashboard') {
                            animation = tabAnimations['navSiblingLater']
                        } else {
                            animation = tabAnimations['navSiblingEarlier']
                        }
                    break;
                    case 'tabmap':
                        animation = tabAnimations['navSiblingLater']
                }

                // add cacheKey to cache views when navigating tabs
                return {
                    name: self.router.stateId(),
                    cacheKey: self.router.stateId(),
                    animation: animation
                };
            })

            self.router.stateId.subscribe(function(newValue) {
                if(typeof newValue !== "undefined") {
                    if(newValue === 'tablist') {
                        self.showFilterBtn(true);
                    } else {
                        self.showFilterBtn(false);
                    }
                }
            });

            return oj.Router.sync();
        };

        self.dispose = function(info) {
            self.router.dispose();
        };

        // store previousTab to determine animation type
        self.navBarChange = function(event) {
            self.previousTab = event.detail.previousValue;    
        };

        self.closePopup = function() {
            return document.getElementById('filterpopup').close();
        };

        // settings for headers on incidents page
        self.incidentsHeaderSettings = {
            name: 'basicHeader',
            params: {
                title: 'Incidents',
                startBtn: {
                    id: 'navDrawerBtn',
                    click: app.toggleDrawer,
                    display: 'icons',
                    label: 'Navigation Drawer',
                    icons: 'oj-fwk-icon oj-fwk-icon-hamburger',
                    visible: true
                },
                endBtn: {
                    id: 'filterPopUpBtn',
                    click: function() {
                        var popup = document.getElementById('filterpopup');
                        popup.position = {
                            "my": {
                                "horizontal": "end",
                                "vertical": "top"
                            },
                            "at": {
                                "horizontal": "end",
                                "vertical": "bottom"
                            },
                            "of": ".oj-hybrid-applayout-header-no-border",
                            "offset": {
                                "x": -10,
                                "y": 0
                            }
                        };
                        // place initial focus on the popup instead of the first focusable element
                        popup.initialFocus = 'popup';
                        return popup.open('#filterIncident');
                    },
                    display: 'icons',
                    label: 'incidents filters',
                    icons: 'oj-fwk-icon demo-icon-font-24 demo-filter-icon',
                    visible: self.showFilterBtn
                }
            }
        }
    }

    return incidentsViewModel;
});
