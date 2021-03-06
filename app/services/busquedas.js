app.factory("busquedas", function($http, $rootScope, api){
    return{
        buscaAutorizaciones:function(datos){

            return $http.get(api+'busqueda/busquedaAutorizaciones');
        },
        buscacliente:function(datos){
            return $http.get(api+'busqueda/cliente');
        },
        buscaposicion:function(datos){
            return $http.get(api+'busqueda/posicion');
        },
        buscariesgo:function(datos){
            return $http.get(api+'busqueda/riesgo');
        },
        buscaUnidades:function(){
            return $http.get(api+'busqueda/busquedaUnidades');

        },
        buscatipoDifusion:function(){
            return $http.get(api+'busqueda/buscatipoDifusion');
        },
        buscaAutMV:function(fechaIni,fechaFin){
            return $http.get(api+'busqueda/busquedaAutMV/'+fechaIni+'/'+fechaFin);
        },
        buscaAutZima:function(){
            return $http.get(api+'busqueda/busquedaAutZima');
        },
        buscaDetalleAutorizacion:function(aut, tipo){
            return $http.get(api+'busqueda/buscaDetalleAutorizacion/'+aut+'/'+tipo);
        },
        listadoOportunidades:function(){
            return $http.get(api+'busqueda/listadoOportunidades');

        },
        buscaOportunidades:function(datos){

            return $http.post(api+'busqueda/buscaOportunidades', datos);

        },
        detalleOportunidad:function(folio){

            return $http.post(api+'busqueda/detalleOportunidad/'+folio);

        },
        cerrarAP:function(folio){

            return $http.post(api+'busqueda/cerrarAP/'+folio);
        }

    }
});
