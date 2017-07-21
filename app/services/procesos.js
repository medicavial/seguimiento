app.factory("procesos", function($http, $rootScope, api){
    return{
        insertaCita:function(datos){
            return $http.post(api+'proceso/insertaCita',datos);
        }

    }
});
