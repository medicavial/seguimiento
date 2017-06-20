app.factory("busquedas", function($http, $rootScope){
    return{
        buscaAutorizaciones:function(datos){
            return $http.get('http://172.17.10.58/apiseg/public/api/busqueda/busquedaAutorizaciones');
        },
         buscaUnidades:function(){
            return $http.get('http://172.17.10.58/apiseg/public/api/busqueda/busquedaUnidades');
        }
    }
});