import {app} from '../../app.js';
import mainCtrl from '../../mainCtrl.js';
import filter_template from './template/filter.html';

app.directive('filterDir', function(){
	return{
		restrict: 'E',
		replace: false,
		controller: 'mainCtrl',
		template: filter_template,
		link: function(scope, element, attributes){
		}
	}
})