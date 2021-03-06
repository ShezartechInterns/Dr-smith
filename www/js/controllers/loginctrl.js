angular.module('drsmith.controllers.loginctrl', [])
.controller('loginctrl', function($scope, $http, $state,$rootScope, $ionicLoading) {

  $ionicLoading.show({
    template: 'Loading...'
  })
  .then(function(){
     console.log("The loading indicator is now displayed");
  });
  if(localStorage.getItem('login'))
  {
    if($rootScope.type=="mentor")
    {
      $ionicLoading.hide();
      $state.go("app.home");
    }
    else
    {
      $ionicLoading.hide();
      $state.go("app.mentee_home");
    }
    
  }
  else
  {
    $ionicLoading.hide();
  }

  $rootScope.url="https://anhance.org";
   localStorage.setItem('url',$rootScope.url);
    $scope.redirect=function(Email,Password,isValid){
                console.log(Email)
                console.log(Password)
                console.log(isValid)
              if(isValid) { 
                 $http(
                  {
                    url: $rootScope.url+"/myproject/login1.php",
                    method:"GET",
                    params:{username:Email,password:Password}
                  })
                  .then(function(response){
                    $scope.result=response.data;
                    console.log($scope.result)
                   
                    if($scope.result.value == "false")
                    {
                      alert("Invalid Mobile No / Password")
                    }
                    else{
                      $rootScope.type=$scope.result.type;
                     $rootScope.id=$scope.result.row.id;
                     $rootScope.phoneno=$scope.result.row.phone_no;
                     $rootScope.name=$scope.result.row.name;
                     $rootScope.mentor_id=$scope.result.row.mid;
                     console.log($rootScope.id,$rootScope.name,$rootScope.type)
                     if($rootScope.type=="mentor")
                     {
                      $rootScope.hideTab=false;
                       localStorage.setItem('login','true');
                       localStorage.setItem('id',$rootScope.id);
                       localStorage.setItem('phoneno',$rootScope.phoneno);
                       localStorage.setItem('name',$rootScope.name);
                       localStorage.setItem('type',$rootScope.type);
                       localStorage.setItem('hideTab',$rootScope.hideTab);
                       $state.go("app.home");
                      
                     }
                     else
                     {
                      $rootScope.hideTab=true;
                      localStorage.setItem('login','true');
                      localStorage.setItem('id',$rootScope.id);
                      localStorage.setItem('phoneno',$rootScope.phoneno);
                      localStorage.setItem('name',$rootScope.name);
                      localStorage.setItem('type',$rootScope.type);
                      localStorage.setItem('mentor_id',$rootScope.mentor_id);
                      localStorage.setItem('hideTab',$rootScope.hideTab);
                      $state.go("app.mentee_home")
                       
                     }
                    }
                     
                   
                  })
                }
                else{
                  alert("Please Enter Valid Credintials")
                }        
    }
  })