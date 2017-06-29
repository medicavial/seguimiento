app.factory("servicios", function($http, $rootScope, api){
    return{
        :function(datos){

            return $http.get(api+'busqueda/busquedaAutorizaciones');
        }
    }
});
