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
        buscaAutMV:function(fechaIni,fechaFin){
            return $http.get(api+'busqueda/busquedaAutMV/'+fechaIni+'/'+fechaFin);
        },
        buscaAutZima:function(){
            return $http.get(api+'busqueda/busquedaAutZima');
        }
    }
});
