import {app} from '../../app.js';
import  '../../mainCtrl.js';
import addUser_template from './template/addUser.html';

app.directive('addiserDir', function(){
	return{
		restrict: 'E',
		replace: false,
		controller: 'mainCtrl',
		template: addUser_template,
		link: function(scope, element, attributes){
		}
	}
})