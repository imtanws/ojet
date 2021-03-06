/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

// handles API calls to MCS backend

'use strict';
define(['jquery', 'appConfig'], function ($, appConfig) {

  var baseUrl = appConfig.backendUrl;
  var registrationUrl = appConfig.registrationUrl;

  // Note, the appConfig contains a Basic Authentication header. The use of Basic Auth is
  // not recommended for production apps.
  var baseHeaders = appConfig.backendHeaders;

  var localUrl = 'localData/';

  var isOnline = true;

  function setOnlineMode(mode) {
    isOnline = mode;
  }

  function registerForNotifications(registration) {
    return $.ajax({
      type: 'POST',
      url: registrationUrl,
      headers: baseHeaders,
      data: JSON.stringify(registration),
      contentType: 'application/json; charset=UTF-8'
    });
  }

  function getCustomers() {
    if(isOnline)
      return $.ajax({
        type: 'GET',
        headers: baseHeaders,
        url: baseUrl + 'customers'
      });
    else {
      return $.ajax(localUrl + 'customers.txt');
    }
  }

  function createCustomer(customer) {
    return $.ajax({
      type: 'POST',
      headers: baseHeaders,
      data: JSON.stringify(customer),
      url: baseUrl + 'customers',
      contentType: 'application/json; charset=UTF-8'
    });
  }

  function updateCustomer(id, customer) {
    return $.ajax({
      type: 'PATCH',
      headers: baseHeaders,
      data: JSON.stringify(customer),
      url: baseUrl + 'customers/' + id,
      contentType: 'application/json; charset=UTF-8'
    });
  }

  function getCustomer(id) {
    if(id) {
      if(isOnline) {
        return $.ajax({
          type: 'GET',
          headers: baseHeaders,
          url: baseUrl + 'customers/' + id
        });
      } else {

        var promise = new Promise(function(resolve, reject){
          $.get(localUrl + 'customers.txt').done(function(response) {
            var customers = JSON.parse(response).result;
            var customer = customers.filter(function(customer) { return customer.id === id; });
            resolve(JSON.stringify(customer[0]));
          }).fail(function(response){
            reject(response);
          });
        });

        return promise;
      }
    }

    return $.when(null);
  }

  function getIncidents() {
    if(isOnline)
      return $.ajax({
        type: 'GET',
        headers: baseHeaders,
        url: baseUrl + 'incidents?technician=~'
      });
    else {
      return $.get(localUrl + 'incidents.txt');
    }
  }

  function getIncidentsStats() {
    if(isOnline)
      return $.ajax({
        type: 'GET',
        headers: baseHeaders,
        url: baseUrl + 'stats/incidents?technician=~'
      });
    else {
      return $.get(localUrl + 'incidentsStats.txt');
    }
  }

  function getIncidentsHistoryStats() {
    if(isOnline) {
      return $.ajax({
        type: 'GET',
        headers: baseHeaders,
        url: baseUrl + 'stats?technician=~&period=annual'
      });
    } else {
      return $.get(localUrl + 'incidentsHistoryStats.txt');
    }
  }

  function createIncident(incident) {
    return $.ajax({
      type: 'POST',
      headers: baseHeaders,
      url: baseUrl + 'incidents',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(incident)
    });
  }

  function getIncident(id) {
    if(id)
      if(isOnline) {
        return $.ajax({
          type: 'GET',
          headers: baseHeaders,
          url: baseUrl + 'incidents/' + id,
          cache: false
        });
      } else {
        return $.get(localUrl + 'incidents/' + id + '.txt');
      }

    return $.when(null);
  }

  function updateIncident(id, incident) {
    if(id)
      return $.ajax({
        type: 'PUT',
        headers: baseHeaders,
        url: baseUrl + 'incidents/' + id,
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(incident)
      });
    return $.when(null);
  }

  function getIncidentActivities(id) {
    if(id) {
      if(isOnline) {
        return Promise.resolve($.ajax({
          type: 'GET',
          headers: baseHeaders,
          url: baseUrl + 'incidents/' + id + '/activities'
        }));
      } else {
        return $.get(localUrl + 'incidents/' + id + '/activities.txt');
      }
    }
  }

  function postIncidentActivity(id, comment, picture) {
    if(id && comment) {

      var activity = { comment: comment, picture: picture };

      return $.ajax({
        type: 'POST',
        headers: baseHeaders,
        url: baseUrl + 'incidents/' + id + '/activities',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(activity)
      });
    } else {
      return $.when(null);
    }
  }

  function updateIncidentActivity(id, actid, content) {
    if(id && actid && content)
      return $.ajax({
        type: 'PATCH',
        headers: baseHeaders,
        url: baseUrl + 'incidents/' + id + '/activities/' + actid,
        data: JSON.stringify(content),
        contentType: 'application/json; charset=UTF-8'
      });
    else
      return $.when(null);
  }

  function getLocation(id) {
    if(id) {
      if(isOnline) {
        return $.ajax({
          type: 'GET',
          headers: baseHeaders,
          url: baseUrl + 'locations/' + id
        });
      } else {

        var promise = new Promise(function(resolve, reject){
          $.get(localUrl + 'locations.txt').done(function(response) {
            var locations = JSON.parse(response);
            var location = locations.filter(function(location) { return location.id === id; });
            resolve(JSON.stringify(location[0]));
          }).fail(function(response){
            reject(response);
          });
        });

        return promise;
      }

    } else {
      return $.when(null);
    }

  }

  function getUserProfile() {
    if(isOnline)
      return $.ajax({
        type: 'GET',
        headers: baseHeaders,
        url: baseUrl + 'users/~'
      });
    else {
      return $.get(localUrl + 'users.txt');
    }
  }

  function updateUserProfile(user) {
    return $.ajax({
      type: 'PATCH',
      headers: baseHeaders,
      url: baseUrl + 'users/~',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(user)
    });
  }

  function sendUserInfo(info) {
    return $.ajax({
      type: 'POST',
      url: 'http://192.168.31.113:8888/userinfo',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(info)
    })
  }

  function getHomepageList(info) {
    return $.ajax({
      type: 'GET',
      url: 'http://localhost:8888/product/1',
      contentType: 'application/json; charset=UTF-8',
      mode:'cors',
      xhrFields: {
        withCredentials: true  //????????????????????????
      },
      crossDomain: true
    })
  }

  function userLogin(data) {
    return $.ajax({
      type: 'POST',
      url: 'http://192.168.31.113:8888/userlogin',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(data)
    })
  }

  function userRegister(data) {
    return $.ajax({
      type: 'POST',
      url: 'http://192.168.31.113:8888/userRegister',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(data)
    })
  }

  function getCarousel() {
    return $.ajax({
      type: 'GET',
      url: 'http://localhost:8888/carousel',
      contentType: 'application/json; charset=UTF-8',
      mode:'cors',
      xhrFields: {
        withCredentials: true  //????????????????????????
      },
    })
  }

  function sendLoan(params) {
    return $.ajax({
      type: 'POST',
      url: 'http://192.168.31.113:8888/loan',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(params),
      mode:'cors',
      xhrFields: {
        withCredentials: true  //????????????????????????
      },
    })
  }

  return {
    registerForNotifications: registerForNotifications,
    getCustomers: getCustomers,
    createCustomer: createCustomer,
    updateCustomer: updateCustomer,
    getCustomer: getCustomer,
    getIncidents: getIncidents,
    getIncidentsStats: getIncidentsStats,
    getIncidentsHistoryStats: getIncidentsHistoryStats,
    createIncident: createIncident,
    getIncident: getIncident,
    updateIncident: updateIncident,
    getIncidentActivities: getIncidentActivities,
    postIncidentActivity: postIncidentActivity,
    updateIncidentActivity: updateIncidentActivity,
    getLocation: getLocation,
    getUserProfile: getUserProfile,
    updateUserProfile: updateUserProfile,
    setOnlineMode: setOnlineMode,
    sendUserInfo: sendUserInfo,
    getHomepageList: getHomepageList,
    userLogin: userLogin,
    userRegister: userRegister,
    getCarousel: getCarousel,
    sendLoan: sendLoan
  };

});
