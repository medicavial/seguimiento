app.controller('autorizacionesCtrl', function($scope, $rootScope,$upload, busquedas) {
    
    $scope.inicio = function(){

       	var hoy = new Date();
		var dd = hoy.getDate();
		var mm = hoy.getMonth()+1; //hoy es 0!
		var yyyy = hoy.getFullYear();

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		} 

		hoy = dd+'/'+mm+'/'+yyyy;
        $scope.datos ={
        	fechaIni:hoy,
        	fechaFin:hoy,
        	unidad:''
        }

       
        $scope.cargador=false;
        $scope.listadoUnidades=[];
        busquedas.buscaUnidades().success(function(data){        	
			$scope.cargador=false;			
			$scope.listadoUnidades=data;
			console.log($scope.listadoUnidades);

		});
    }

	$scope.buscarAutorizaciones = function(){	
	console.log('entro');	
	$scope.cargador=true;
		busquedas.buscaAutorizaciones($scope.datos).success(function(data){
			$scope.cargador=false;
			console.log(data);	
			$scope.listadoAutorizaciones=data;
		});
	}
    
});


///estructura de controlador
// app.controller('nombredelcontroladorCtrl',function (dependencias $scope,nombrefactoria,$rootScope) {
// 	// codigos con funciones varaibles
// 	// $scope.variable
// })