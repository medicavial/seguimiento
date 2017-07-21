app.controller('loginCtrl', function($scope, $rootScope, sesion) {

    $scope.inicio = function(){
    	$rootScope.cargadorInicio =false;

        $scope.user = '';
        $scope.psw = '';
        $rootScope.mensaje = '';
        $rootScope.cerrar = true;
    }

    $scope.login = function(){
        
        
        sesion.login($scope.user,$scope.psw);
    }
    
});