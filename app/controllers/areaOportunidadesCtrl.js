app.controller('areaOportunidadesCtrl', function($scope, $rootScope,) {

    $scope.inicio = function(){

    	   $(document).ready(function() {
		    $('select').material_select();
		  });
		  $('.datepicker').pickadate({
		    selectMonths: true, // Creates a dropdown to control month
		    selectYears: 15 // Creates a dropdown of 15 years to control year
		  });

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

	        hoy = yyyy+'/'+mm+'/'+dd;


	        $scope.buscar = {

	        	fechaini: hoy,
	        	fechafin: hoy


	        }

	        listado = [
		        {
		            "Name": "Otto Clay",
		            "Age": 61,
		            "Country": 6,
		            "Address": "Ap #897-1459 Quam Avenue",
		            "Married": false
		        }]

		    $scope.buscaOportunidades();





    }

	

    $scope.buscaOportunidades = function(){

        $("#jsGrid").jsGrid({

		    width: "100%",
		    height: "400px",

		    filtering: true,
		    editing: true,
		    sorting: true,
		    paging: true,

		    data: listado,

		    fields: [
		        { name: "Name", type: "text", width: 150 },
		        { name: "Age", type: "number", width: 50 },
		        { name: "Address", type: "text", width: 200 },
		        { name: "Country", type: "select", valueField: "Id", textField: "Name" },
		        { name: "Married", type: "checkbox", title: "Is Married", sorting: false },
		        { type: "control" }
		    ]
		});

    }

    
});


///estructura de controlador
// app.controller('nombredelcontroladorCtrl',function (dependencias $scope,nombrefactoria,$rootScope) {
// 	// codigos con funciones varaibles
// 	// $scope.variable
// })