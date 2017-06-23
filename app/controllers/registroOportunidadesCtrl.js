app.controller('registroOportunidadesCtrl', function($scope, $rootScope, busquedas, datos) {    
    $scope.listadoUnidades=datos[0].data;    
    $scope.riesgos=datos[1].data;
    // $scope.riesgos=datos[1].data;
    $scope.inicio = function(){
    	  
		  $scope.datos = {
		  	cliente: ''
		  }

		 
		 
    }    

    
    
});


///estructura de controlador
// app.controller('nombredelcontroladorCtrl',function (dependencias $scope,nombrefactoria,$rootScope) {
// 	// codigos con funciones varaibles
// 	// $scope.variable
// })