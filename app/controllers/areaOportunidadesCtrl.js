app.controller('areaOportunidadesCtrl', function($scope, $rootScope,) {

    $scope.inicio = function(){

    	   $(document).ready(function() {
		    $('select').material_select();
		  });
		  $('.datepicker').pickadate({
		    selectMonths: true, // Creates a dropdown to control month
		    selectYears: 15 // Creates a dropdown of 15 years to control year
		  });




    }

    
});


///estructura de controlador
// app.controller('nombredelcontroladorCtrl',function (dependencias $scope,nombrefactoria,$rootScope) {
// 	// codigos con funciones varaibles
// 	// $scope.variable
// })