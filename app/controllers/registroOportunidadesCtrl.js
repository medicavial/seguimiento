app.controller('registroOportunidadesCtrl', function($scope, $rootScope, busquedas) {

    $scope.inicio = function(){

    	   $(document).ready(function() {
		    $('selectriesgo').material_select();
		  });
    	  $(document).ready(function() {
		    $('select').material_select();
		  });

		  $('.datepicker').pickadate({
		    selectMonths: true, // Creates a dropdown to control month
		    selectYears: 15 // Creates a dropdown of 15 years to control year
		  });

		  $scope.datos = {

		  	cliente: ''


		  }

		  $scope.cliente();
		  $scope.riesgo();

    }


    $scope.cliente = function(){

        busquedas.buscacliente().success( function (data) {

        	$scope.clientes = data;
console.log(data);
        });

    }


    $scope.riesgo = function(){

        busquedas.buscariesgo().success( function (data) {

        	$scope.riesgos = data;
        	console.log(data);

        });

    }

    
});


///estructura de controlador
// app.controller('nombredelcontroladorCtrl',function (dependencias $scope,nombrefactoria,$rootScope) {
// 	// codigos con funciones varaibles
// 	// $scope.variable
// })