app.controller('autorizacionesCtrl', function($scope, $rootScope, busquedas, procesos, datos, upload) {
    		
	$scope.listadoUnidades=datos[0].data;
	$scope.listadoAutMV = datos[1].data;

	
	listado=$scope.listadoAutMV;
	$scope.verDetalle = false;
	$scope.cargadorContendor = false;
    $scope.cargadorcita=false;
	
    $scope.inicio = function(){
        $rootScope.cargadorInicio =false;
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

		hoy = yyyy+'-'+mm+'-'+dd;
        $scope.datos ={
        	fechaIni:hoy,
        	fechaFin:hoy,
        	unidad:''
        };       
        $scope.cargador=false; 
        $scope.detalleAut={
            aut:'',
            folio:'',
            nombre:'',
            movimiento:'',
            fecreg:''
        };
        $scope.citaAut={
            fecha:'',
            hora:'',           
            confirmadoPro:'',
            confirmadoLes:'',
            notas:'',
            proveedor:'',
            folio:'',
            tipo:''
        };
        $scope.soporte={
            archivo:'',
            obs:''
        }

        
         $scope.cargaGrid();
         $scope.gridConfig = {
                                   
            deleteConfirm: function(item) {
                return "The client \"" + item.Name + "\" will be removed. Are you sure?";
            },
            rowClick: function(args) {

                $scope.showDetailsDialog(args);
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

                    $scope.listadoAutMV =[];
					busquedas.buscaAutMV($scope.datos.fechaIni,$scope.datos.fechaFin).success(function(data){
                         console.log(data);
                         $scope.listadoAutMV=data;
                         $scope.cargador=false;	
                         $("#grid").jsGrid("loadData");				
					});
				}


				$scope.showDetailsDialog = function(row) {	              	
					$scope.verDetalle=true;
					$scope.cargadorContendor=true;			
					busquedas.buscaDetalleAutorizacion(row.item.AUT,row.item.TIPO).success(function(data){

                        $scope.detalleAut.aut=row.item.AUT;
                        $scope.detalleAut.folio=row.item.FOLIO;
                        $scope.detalleAut.nombre=row.item.LESIONADO;
                        $scope.detalleAut.movimiento=row.item.MOVIMIENTO;
                        $scope.detalleAut.fecreg=row.item.FECHAREG;
                        $scope.detalleAut.img=row.item.IMG;
                        $scope.detalleAut.ciacve = row.item.CIACLAVE;
                        $scope.detalleAut.unidad = row.item.UNIDAD;
                        $scope.detalleAut.tel = row.item.TEL;
                        $scope.detalleAut.diag = row.item.DIAG;
                        $scope.detalleAut.obs = row.item.OBS;
                        $scope.detalleAut.tipo = row.item.TIPO;
                        $scope.detalleAut.estimacion = row.item.ESTIMACION;
                        $scope.detalleAut.cveMovimiento = row.item.CVE_MOVIMIENTO;
                        console.log(row);
						$scope.cargadorContendor=false;											
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

                $scope.abrirModal = function(){
                     $scope.openModal = true;
                }

                $scope.guardarCita = function(){
                    $scope.cargadorcita=true;                    
                    $scope.citaAut.folio = $scope.detalleAut.folio;
                    $scope.citaAut.tipo  = $scope.detalleAut.tipo;
                    procesos.insertaCita($scope.citaAut).success(function(data){
                        $scope.cargadorcita=true;  
                        Materialize.toast('La cita se guardó correctamente!', 5000, 'green');                   
                        console.log(data);
                    })                    
                    //$('#modal1').closeModal();
                }

                $scope.getFileDetails = function (e) {
                    $scope.files = [];
                    $scope.$apply(function () {

                        // STORE THE FILE OBJECT IN AN ARRAY.
                        for (var i = 0; i < e.files.length; i++) {
                            $scope.files.push(e.files[i])
                        }

                    });
                    console.log($scope.files);
                };


                $scope.guardarSoporte = function(){
                    $scope.cargadorcita=true;                    
                    $scope.soporte.folio = $scope.detalleAut.folio;
                    $scope.soporte.tipo  = $scope.detalleAut.tipo;                    
                    unidad = 1;
                    fechaMod='2017-01-01';
                    upload.uploadFile($scope.files, unidad, fechaMod).then(function(res)
                    {                    
                        if(res.data=='exito'){                      
                          $scope.file='';
                          $scope.cargadorcita=false;  
                          $scope.formData = {};
                          $scope.soporte={
                                archivo:'',
                                obs:''
                            }
                        $scope.file='';
                          $scope.myForm.$setPristine();
                          Materialize.toast('La cita se guardó correctamente!', 5000, 'green'); 
                        }else{
                          $scope.mensaje='Ocurrió un problema';
                        }                    
                    })
                }               

                $scope.cargaGrid = function(){
                    
                    (function() {
                        var db = {

                            loadData: function(filter) {
                                return $.grep($scope.listadoAutMV, function(client) {
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


                        //db.clients = $scope.listadoAutMV;
                    }());
                                                 
                }

    
});






///estructura de controlador
// app.controller('nombredelcontroladorCtrl',function (dependencias $scope,nombrefactoria,$rootScope) {
// 	// codigos con funciones varaibles
// 	// $scope.variable
// })