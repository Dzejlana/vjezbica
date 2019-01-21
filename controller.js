function myCtrl($scope, $http){
    console.log("Hello");

    var refresh=function(){
        $http.get('/test').success(function(response){
        console.log("I got data");
        $scope.test = response;
        $scope.contact = "";
        });
    };

refresh();


    //ispisuje sve iz baze /u consoli
    $http.get('/test').success(function(response){
        console.log("I got data");
        $scope.test = response;
    });

    //ADD buttton
    $scope.addContact=function(){
        console.log($scope.contact); //Code to check connection

        $http.post('/test', $scope.contact).success (function(response){
            console.log(response);
            refresh();
        });

    };
        // remove button
        $scope.remove = function(id) {
        console.log(id);
        $http.delete('/test/' + id).success(function(response) {
          refresh();
            });
            };
             

    // edit button
      $scope.edit=function(id){
        console.log(id); //Code to check connection
        $http.get('/test/'+id).success(function(response){
            $scope.contact=response;
        });
    }
    
    //UPDATE BUTTON
    $scope.update=function(){
        console.log($scope.contact._id); //Code to check connection
        $http.put('/test/'+ $scope.contact._id,$scope.contact).success(function(response){
            refresh();
        })
    };


    //CLEAR BUTTON
    $scope.deselect = function(){
        $scope.contact = "";
    }

}