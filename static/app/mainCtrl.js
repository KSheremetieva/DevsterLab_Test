import {app} from './app.js';

app.controller('mainCtrl', function($scope, $localStorage, $sessionStorage, $filter, $http, geolocation){
$scope.ifReopen = () => {
// if reopen
	if(!!$localStorage.userList){
		$scope.users = $localStorage.userList;
		$scope.myLat = $localStorage.myLatitude;
		$scope.myLong = $localStorage.myLongitude;
	}else{
// if first time
		$http({
			method: 'GET',
			url: 'https://jsonplaceholder.typicode.com/users',
			}).then(
				function success(response){
					$localStorage.userList = response.data;
					$scope.users = $localStorage.userList;
					console.log($localStorage.userList);
				},
				function error(response){
					console.log(response.statusText);
				}
			);
		// GEO
		$scope.R = 6371;
		geolocation.getLocation().then(function(data){
		    // $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
		    $localStorage.myLatitude = data.coords.latitude;
		    $localStorage.myLongitude = data.coords.longitude;
		    $scope.myLat = $localStorage.myLatitude;
		    $scope.myLong = $localStorage.myLongitude;
		    $scope.getLoc = true;

		    for(let i = 0; i<$localStorage.userList.length; i++){
				let usLat = $localStorage.userList[i].address.geo.lat;
				let usLong = $localStorage.userList[i].address.geo.lng;
				let d = Math.acos( Math.sin($scope.myLong)*Math.sin(usLong) + Math.cos($scope.myLong)*Math.cos(usLong)*(Math.cos((usLat) - ($scope.myLat))) );
				let L = Math.round( d*($scope.R) );
				$localStorage.userList[i].address.long = L ;
				$scope.longFlag = true;
			}
		});
	}
};






// SORT BY
$scope.sortType = 'name';
$scope.sortReverse = false;
$scope.searchUser = '';
$scope.sortBy = (arg) => {
$scope.sortType = arg;
$scope.sortReverse = !$scope.sortReverse;
};

// ADD USER
$scope.addUser = (newName, newUsername, newEmail, newAddrStreet, newAddrSuite, newAddrCity, newAddrZipcode, newPhone, newWebsite, newCompName, newCompCPhrase, newCompBS) => {	
  	// create currect id
  	$localStorage.maxId += 1;
  	$scope.newUser = {
  		id: $localStorage.maxId,
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
  	$localStorage.userList.push($scope.newUser)
  };

// REMOVE USER
$scope.removeUser = (arg) => {
	console.log(arg);
	for(let i = 0; i<$localStorage.userList.length; i++){
		if($localStorage.userList[i] == arg){
			$localStorage.userList.splice(i,1)
		}
	}
};

// CHANGE USER INFO
$scope.checkSave = (item, data, arg) => {
	console.log(item, data, arg);
	if(arg == "username"){
		for(let q = 0; q<$localStorage.userList.length; q++){
			// check
			if($localStorage.userList[q].username == data){
				return 'Username should be unique!';
			}else if($localStorage.userList[q].id == item.id){
				$localStorage.userList[q].username = data;
				return;
			}
		}
	}
	for(let i = 1; i<$localStorage.userList.length; i++){
		// find item
		if(item.id == $localStorage.userList[i].id){
			// if address/company changes
			if(arg == "username" || arg == "city" || arg == "street" || arg == "suite" || arg == "companyName" || arg == "bs" || arg == "catchPhrase"){
				switch(arg){
					case "username":
						break;
					// address
					case "city":
						$localStorage.userList[i].address.city = data;
						break;
					case "street":
						$localStorage.userList[i].address.street = data;
						break;
					case "suite":
						$localStorage.userList[i].address.suite = data;
						break;
					// company
					case "companyName":
						$localStorage.userList[i].company.name = data;
						break;
					case "bs":
						$localStorage.userList[i].company.bs = data;
						break;
					case "catchPhrase": 
						$localStorage.userList[i].company.catchPhrase = data;
						break;
					}
			}else{
				$localStorage.userList[i].arg = data;
			}
		}
	}
};

// MESSAGE
$scope.messageFlag = true;
$scope.message = () => {
	if(!!$scope.messageFlag){
		$scope.messageFlag = false;
		alert("All users have successfully downloaded");
	};
		// find max id
		$sessionStorage.allId = [];
		for(let i = 0; i<$localStorage.userList.length; i++){
			$sessionStorage.allId.push($localStorage.userList[i].id);
		}
		$localStorage.maxId = Math.max.apply(null, $sessionStorage.allId);
	};


// UNIQUE USERNAME (IN ADD USER FORM)
$scope.checkInput = (val) => {
	console.log(val);
	for(let i = 0; i<$localStorage.userList.length; i++){
		// console.log($localStorage.userList[i].username)
		if($localStorage.userList[i].username == val){
			alert("da")
			$scope.checkInp = true;
			console.log(val);

		}else{
			$scope.checkInp = false;
		}
	}
};

});




