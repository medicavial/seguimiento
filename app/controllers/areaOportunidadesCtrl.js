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

// hoy = dd+'/'+mm+'/'+yyyy;

hoy = yyyy+'/'+mm+'/'+dd;

app.controller('areaOportunidadesCtrl', function($scope, $rootScope, datos, busquedas) {

	$scope.listado = datos[1].data;
	$scope.unidades = datos[0].data;


	listado = $scope.listado;

    $scope.inicio = function(){

        $scope.buscar ={
        	fechaini:hoy,
        	fechafin:hoy,
        	unidad:''
        }       
        $scope.cargador=false; 


        (function() {
    var db = {

        loadData: function(filter) {
            return $.grep($scope.listado, function(client) {
                return (!filter.cliente || client.cliente.indexOf(filter.cliente) > -1)
                    && (!filter.unidad || client.unidad.indexOf(filter.unidad) > -1)
                    && (!filter.folioMV || client.folioMV.indexOf(filter.folioMV) > -1)
                    && (!filter.lesionado || client.lesionado.indexOf(filter.lesionado) > -1)
                    && (!filter.fechaReporte || client.fechaReporte === filter.fechaReporte)
                    && (!filter.folioOP || client.folioOP.indexOf(filter.folioOP) > -1);


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


    db.clients = $scope.listado;
}());

        $scope.gridConfig = {
               
                // deleteConfirm: function(item) {
                //     return "The client \"" + item.Name + "\" will be removed. Are you sure?";
                // },
                rowClick: function(item) {
                    console.log(item.item.folioOP);
                    $scope.modal(item.item.folioOP);
                },
                onInit: function(e) {
                    $scope.gridInstance = e.grid;
                },
                height: "100%",
                width: "100%",
                filtering: true,
                editing: false,
                sorting: true,
                paging: true,
                autoload: true,
                pageSize: 15,
                pageButtonCount: 5,
                deleteConfirm: "Do you really want to delete the client?",
                controller: db,
                fields: [
                    { name: "estatus", type: "text", title: "Estatus" ,width: 60 },
                    { name: "cliente", type: "text", title: "Cliente" ,width: 70 },
                    { name: "unidad", type: "text", title: "Unidad",  width: 150},
                    { name: "folioMV", type: "text",title: "Folio MV", width: 150},
                    { name: "lesionado", type: "text",title: "Lesionado", width: 150},
                    { name: "fechaReporte", type: "text",title: "Fecha Reporte", width: 150},
                    { name: "folioOP", type: "text",title: "Folio O.P", width: 150},
                    { name: "notifica", type: "text",title: "Notifica", width: 150},


                ]
            };             
    }

	$scope.buscaOportunidades = function(){	
        $scope.carga = true;

		busquedas.buscaOportunidades($scope.buscar).success(function(data){

				$scope.carga = false;
				$scope.listado = data;

                $("#grid").jsGrid("loadData");
                $('#tabla').addClass('slideInDown');

		});
	}

    $scope.limpiar = function(){ 

        $scope.buscar = {

            fechaini:hoy,
            fechafin:hoy,
            unidad:''
        }   

    }

    $scope.modal = function(folio) {

        $('#modal5').openModal();

        console.log(folio);

        busquedas.detalleOportunidad(folio).success(function(data){

            $scope.detalles = data;
            $scope.folioOP = data[0].folioOP;

            console.log(data);

        });
    }

    $scope.cerrarAP = function() {

        busquedas.cerrarAP($scope.folioOP).success(function(data){

            $('#modal5').closeModal();
            busquedas.buscaOportunidades($scope.buscar).success(function(data){

                    $scope.carga = false;
                    $scope.listado = data;

                    $("#grid").jsGrid("loadData");
                    $('#tabla').addClass('slideInDown');

            });



        });

    }



});


///estructura de controlador
// app.controller('nombredelcontroladorCtrl',function (dependencias $scope,nombrefactoria,$rootScope) {
// 	// codigos con funciones varaibles
// 	// $scope.variable
// })