app.controller('autorizacionesCtrl', function($scope, $rootScope,$upload, busquedas, datos) {
    		
	$scope.listadoUnidades=datos[0].data;
	$scope.listadoAutMV = datos[1].data;

	
	listado=$scope.listadoAutMV;
	$scope.verDetalle = false;
	
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



        (function() {
    var db = {

        loadData: function(filter) {
            return $.grep(this.clients, function(client) {
                return (!filter.AUT || client.AUT.indexOf(filter.AUT) > -1)
                    && (!filter.FOLIO || client.FOLIO.indexOf(filter.FOLIO) > -1)
                    && (!filter.LESIONADO || client.LESIONADO.indexOf(filter.LESIONADO) > -1)
                    && (!filter.MOVIMIENTO || client.MOVIMIENTO.indexOf(filter.MOVIMIENTO) > -1)
                    && (!filter.FECHAREG || client.FECHAREG === filter.FECHAREG)
                    && (!filter.TIPO || client.TIPO.indexOf(filter.TIPO) > -1);
            });
        },

        insertItem: function(insertingClient) {
            this.clients.push(insertingClient);
        },

        updateItem: function(updatingClient) { },

        deleteItem: function(deletingClient) {
            var clientIndex = $.inArray(deletingClient, this.clients);
            this.clients.splice(clientIndex, 1);
        }

    };

    window.db = db;


    db.countries = [
        { Name: "", Id: 0 },
        { Name: "Estados Unidos", Id: 1 },
        { Name: "Canada", Id: 2 },
        { Name: "United Kingdom", Id: 3 },
        { Name: "France", Id: 4 },
        { Name: "Brazil", Id: 5 },
        { Name: "China", Id: 6 },
        { Name: "Russia", Id: 7 }
    ];
    db.clients = listado;
}());

        $scope.gridConfig = {
               
                deleteConfirm: function(item) {
                    return "The client \"" + item.Name + "\" will be removed. Are you sure?";
                },
                rowClick: function(args) {
                    $scope.showDetailsDialog();
                },
                onInit: function(e) {
                    $scope.gridInstance = e.grid;
                },
                 height: "70%",
                width: "100%",
                filtering: true,
                editing: true,
                sorting: true,
                paging: true,
                autoload: true,
                pageSize: 15,
                pageButtonCount: 5,
                deleteConfirm: "Do you really want to delete the client?",
                controller: db,
                fields: [
                    { name: "AUT", type: "text", width: 60 },
                    { name: "FOLIO", type: "text", width: 70 },
                    { name: "LESIONADO", type: "text", width: 150},
                    { name: "MOVIMIENTO", type: "text",title: "MOVIMIENTO", width: 150},
                    { name: "FECHAREG", type: "text", title: "FECHA AUTORIZACION", sorting: false },                    
                    { name: "TIPO", type: "text", title: "TIPO", sorting: false },                    
                    { type: "control" }                    
                ]
            };             
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


				$scope.showDetailsDialog = function() {
	              	console.log('entro');	
	              	 $('#mianimacion').addClass('animated bounceOutLeft');
					$scope.verDetalle=true;
					busquedas.buscaAutorizaciones($scope.datos).success(function(data){
						$scope.cargador=false;
						console.log(data);	
						$scope.listadoAutorizaciones=data;
					});
	            };

	            $scope.regresarListado = function() {	              	
					$scope.verDetalle=false;
					busquedas.buscaAutorizaciones($scope.datos).success(function(data){
						$scope.cargador=false;
						console.log(data);	
						$scope.listadoAutorizaciones=data;
					});
	            };

    
});






///estructura de controlador
// app.controller('nombredelcontroladorCtrl',function (dependencias $scope,nombrefactoria,$rootScope) {
// 	// codigos con funciones varaibles
// 	// $scope.variable
// })