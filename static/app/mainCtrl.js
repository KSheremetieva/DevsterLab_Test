import angular from "angular";
// import $ from 'jquery';
import {app} from './app.js';

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

app.controller('mainCtrl', function($scope, $localStorage, $sessionStorage, $filter, $http){
	$scope.users;
	$scope.show = 'userlist'
	$scope.getData = () => {
		$.ajax({
			method: 'GET',
			dataType: 'json',
			url: 'https://jsonplaceholder.typicode.com/users',
		}).done(request=>$scope.getInfo(request))
		.fail(request=>console.log('fail'));
	}
	$scope.getInfo = (request) => {
		$scope.users = $localStorage.user || request;
		$localStorage.user = $scope.users;
		console.log($localStorage.user)
		$scope.$apply()
	}

	$scope.rowForm = true;
	$scope.showBtn = () => {
		$scope.rowForm = !$scope.rowForm;
	}

	// REMOVE USER
	$scope.removeUser = (index) => {
		console.log(index)
		// $localStorage.user.splice(index, 1)
		for(let i = 0; i<$localStorage.user.length; i++){
			if($localStorage.user[i].id == index){
				$localStorage.user.splice(i, 1)
			}
		}
	}

	// ADD USER
 	$scope.addUser = (newName, newUsername, newEmail, newAddrStreet, newAddrSuite, newAddrCity, newAddrZipcode, newPhone, newWebsite, newCompName, newCompCPhrase, newCompBS) => {
  		$scope.allId = [];
  		for(let i = 0; i<$localStorage.user.length; i++ ){
  			$scope.allId.push($localStorage.user[i].id);
  			console.log($scope.allId)
  		}
  		//определение мах id
  		$scope.maxId = Math.max.apply(null, $scope.allId);
  		$scope.newId = $scope.maxId +1;
  		// console.log($scope.currentLength, $scope.maxId, $scope.newId)
  	
  	$scope.newUser = {
  		id: $scope.newId,
	      name: newName,
	      username: newUsername,
	      email: newEmail,
	      address: {
	      	street: newAddrStreet,
	      	suite: newAddrSuite,
	      	city: newAddrCity,
	      	zipcode: newAddrZipcode,
	      },
	      phone: newPhone,
	      website: newWebsite,
	      company: {
	      	name: newCompName,
	      	catchPhrase: newCompCPhrase,
	      	bs: newCompBS,
	      },
  	},
  	$localStorage.user.push($scope.newUser)
  }

  // SORT TYPE
  $scope.sortType = 'name'; // значение сортировки по умолчанию
  $scope.sortReverse = false; // обратная сортривка
  $scope.searchUser = ''; // значение поиска по умолчанию
  

});