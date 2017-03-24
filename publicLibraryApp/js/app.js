
/* App Module */

var publicLibraryApp = angular.module( 'publicLibraryApp',
['ngRoute', 'publicLibraryControllers']);

/**
 * Configuration Block
 */
publicLibraryApp.config( [ '$routeProvider', function ( $routeProvider){
  $routeProvider
  // Router configuration
    .when( '/', {
      redirectTo: '/main'
     })
    .when( '/main', {
      templateUrl: 'partials/main.html',
      controller: 'BooksController'
     })
    .when( '/showAllBooks', {
      templateUrl: 'partials/showAllBooks.html',
      controller: 'BooksController'
    })
    .when( '/createBook', {
      templateUrl: 'partials/createBook.html',
      controller: 'BooksController'
    })
    .when( '/viewDetails', {
      templateUrl: 'partials/viewDetails.html',
      controller: 'BooksController'
    })
    .when( '/updateBook', {
      templateUrl: 'partials/updateBook.html',
      controller: 'BooksController'
    })
    /*.when( '/deleteBook', {
      templateUrl: 'partials/deleteBook.html',
      controller: 'BooksController'
    })*/
    .when( '/404', {
      templateUrl: 'partials/404.html'
    })
    .otherwise( {
      redirectTo: '/404'
  });
}]);

