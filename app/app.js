//inicializamos la aplicacion
var app = angular.module('app', ['ui.materialize', 'ngCookies','ngRoute','ngAnimate','angularFileUpload']);

//configuramos nuestra aplicacion
app.config(function($routeProvider){

    //Configuramos la ruta que queremos el html que le toca y que controlador usara
    $routeProvider.when('/home',{
            templateUrl: 'views/home.html',
            controller : 'homeCtrl'
    });

    $routeProvider.when('/login',{
            templateUrl: 'views/login.html',
            controller : 'loginCtrl'
    });
    $routeProvider.when('/autorizaciones',{
            templateUrl: 'views/autorizaciones.html',
            controller : 'autorizacionesCtrl',
            resolve : {
                datos : function(busquedas,$q){
                    var promesa         = $q.defer(),
                        unidad          = busquedas.buscaUnidades();

                    $q.all([unidad]).then(function (data){
                        promesa.resolve(data);
                    },function (error){
                        promesa.reject('Error');
                    });

                    return promesa.promise;
                }
            }
    });

    $routeProvider.when('/areaOportunidades',{
            templateUrl: 'views/areaOportunidades.html',
            controller : 'areaOportunidadesCtrl'
    });

    $routeProvider.when('/registroOportunidades',{
            templateUrl: 'views/registroOportunidades.html',
            controller : 'registroOportunidadesCtrl',
            resolve : {
                datos : function(busquedas,$q){
                    var promesa         = $q.defer(),
                        cliente         = busquedas.buscacliente(),
                        // Posicion        = busquedas.buscaposicion();
                        Riesgo          = busquedas.buscariesgo();
                    $q.all([cliente,Riesgo]).then(function (data){
                        promesa.resolve(data);
                    },function (error){
                        promesa.reject('Error');
                    });                   
                    return promesa.promise;
                }
            }
    });


    $routeProvider.when('/seguimientoOportunidades',{
            templateUrl: 'views/seguimientoOportunidades.html'
            // controller : 'seguimientoOportunidadesCtrl'
    });
    
    $routeProvider.otherwise({redirectTo:'/login'});

});

app.constant('api','http://localhost/apiseg/public/api/')


//sirve para ejecutar cualquier cosa cuando inicia la aplicacion
app.run(function ($rootScope ,$cookies, $cookieStore, sesion, $location){

    $rootScope.home = true;
    $rootScope.bus = false;
    $rootScope.admin = true;
    $rootScope.cerrar = false;
    $rootScope.ruta = 'home';


    //verifica el tamaño de la pantalle y oculta o muestra el menu
    var mobileView = 992;

    $rootScope.getWidth = function() { return window.innerWidth; };

    $rootScope.$watch($rootScope.getWidth, function(newValue, oldValue)
    {
        if(newValue >= mobileView)
        {
            if(angular.isDefined($cookieStore.get('toggle')))
            {
                if($cookieStore.get('toggle') == false)
                    $rootScope.toggle = false;

                else
                    $rootScope.toggle = true;
            }
            else 
            {
                $rootScope.toggle = true;
            }
        }
        else
        {
            $rootScope.toggle = false;
        }

    });

    $rootScope.toggleSidebar = function() 
    {
        $rootScope.toggle = ! $rootScope.toggle;

        $cookieStore.put('toggle', $rootScope.toggle);

    };


    window.onresize = function() { $rootScope.$apply(); };


    //evento que verifica cuando alguien cambia de ruta
    $rootScope.$on('$routeChangeStart', function(){

        $rootScope.cerrar = false;
        $rootScope.username =  $cookies.username;

        sesion.checkStatus();

    });


    //funcion en angular
    $rootScope.logout = function(){

        sesion.logout();
    } 

    //generamos al rootscope las variables que tenemos en las cookies para no perder la sesion 
    $rootScope.username =  $cookies.username;

});


//servicio que verifica sesiones de usuario
app.factory("sesion", function($cookies,$cookieStore,$location, $rootScope, $http,api)
{
    return{
        login : function(username, password)
        {  
            $rootScope.cargador=true; 
            $http({
                url:api+'busqueda/login',
                method:'POST', 
                contentType: 'application/json', 
                dataType: "json", 
                data:{user:username,psw:password}
            }).success( function (data){
                console.log(data);
                $rootScope.cargador=false; 
                if (data.respuesta) {
                    $rootScope.mensaje = data.respuesta;
                }else{
                    $rootScope.mensaje = '';
                    $rootScope.username = data[0].Usu_nombre;
                    $cookies.username = data[0].Usu_nombre;
                    $location.path("/home");
                    //console.log(data);
                }
            });



        },
        logout : function()
        {
            //al hacer logout eliminamos la cookie con $cookieStore.remove y los rootscope
            $cookieStore.remove("username"),
            $rootScope.username =  '';

            //mandamos al login
            $location.path("/login");

        },
        checkStatus : function()
        {
            //verifica el estatus de la sesion al cambiar de ruta 
            //si manda alguna ruta direfente de login y no tiene sesion activa en cookies manda a login
            if($location.path() != "/login" && typeof($cookies.username) == "undefined")
            {   
                $location.path("/login");
            }
            //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
            if($location.path() == "/login" && typeof($cookies.username) != "undefined")
            {
                $location.path("/home");
            }
        }
    }

});


app.factory("busquedas", function($http, $rootScope){
    return{
    }
});


///notas 



//definicion de factoria en angular
// app.factory('nombredefactoria',function($http,$rootScope){
//     return{
//         query:function(parametros){
//             //cualquier cosa
//         },
//         alta:function(){
//             //cualquier cosa
//         }
//     }
// })


///funciones en algular
// $rootScope.nombrefuncion = function(parametros){}
// $scope.nombrefuncion = function(){}

// //llamada desde html
// <button ng-click="nombrefuncion()">
// //llamada desde js
// $scope.nombrefuncion();

