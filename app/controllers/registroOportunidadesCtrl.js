app.controller('registroOportunidadesCtrl', function($scope, $rootScope, busquedas, datos, api, $http) {  

    $scope.clientes=datos[0].data;    
    $scope.riesgos=datos[1].data;
    $scope.posiciones = datos[2].data;
    $scope.unidades = datos[3].data;
    $scope.tipos = datos[4].data;

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

        // hoy = dd+'/'+mm+'/'+yyyy;
        hoy = yyyy+'/'+mm+'/'+dd;


        $scope.datos = {


            cliente : '',
            folio: '',
            fechaReporte: hoy,
            poliza: '',
            inciso: '',
            grado: '',
            asegurado: '',
            notifica: '',
            tipo: '',
            unidad: '',
            folioMV: '',
            lesionado: '',
            edad: '',
            domicilio: '',
            riesgo: '',
            posicion: '',
            tipo: '',
            medicoTratante: '',
            motivo: '',
            observaciones: '',
            nombreReporta: '',
            usuario : $rootScope.usulogin

        }
        console.log($rootScope.usulogin);
		 
    }   

    $scope.guardaOportunidad = function(){

            var ruta = api+'Oportunidades/insertaOportunidad'; 
            $scope.spinner = true;

                $http.post(ruta,$scope.datos).success(function (data){

                    $(document).ready(function(){
                      $('.tooltipped').tooltip({delay: 50});
                     });
                    $scope.spinner = false;

                    $scope.datos = {

                        cliente : '',
                        folio: '',
                        fechaReporte: '',
                        poliza: '',
                        inciso: '',
                        grado: '',
                        asegurado: '',
                        notifica: '',
                        tipo: '',
                        unidad: '',
                        folioMV: '',
                        lesionado: '',
                        edad: '',
                        domicilio: '',
                        riesgo: '',
                        posicion: '',
                        tipo: '',
                        medicoTratante: '',
                        motivo: '',
                        observaciones: '',
                        nombreReporta: ''

                    }


                }).error( function (data){

                    alert('Error, Intentalo de Nuevo');

                });

            } 

    
});

