import {app} from '../../app.js';
import mainCtrl from '../../mainCtrl.js';
import userList_template from './template/userList.html';

app.directive('userlistDir', function(){
	return{
		restrict: 'E',
		replace: false,
		controller: 'mainCtrl',
		template: userList_template,
		link: function(scope, element, attributes){
		}
	}
})