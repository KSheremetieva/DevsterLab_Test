import angular from "angular";
import ngStorage from "ngstorage";
import ngclipboard from "ngclipboard";
import geolocation from 'angularjs-geolocation';
// import $ from 'jquery';

var app = angular.module("app", ['ngStorage', 'xeditable', 'ngclipboard', 'geolocation'])
export {app};