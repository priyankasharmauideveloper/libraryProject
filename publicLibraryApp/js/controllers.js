/* Controllers */

var publicLibraryControllers = angular.module('publicLibraryControllers', []);

publicLibraryControllers.controller('BooksController',
['$scope', '$route', '$location', '$http', function ( $scope,$route, $location, $http) {

  /**
   * ## getAllBooks-list all the books in the library
   */
  $scope.getAllBooks = function () {
    $http({
      method: 'GET',	
      url: 'https://interview-api-staging.bytemark.co/books',
      // url: 'js/sample.json',
      contentType : 'application/json'
    })
      .success( function (response) {
        $scope.books = response;
      })
      .error( function (response) {
        console.log(response);
        alert("OH! books cannot be found");
      });
  };

  $scope.getAllBooks();
    
   /**
   * ## view the details of the book
   */

   $scope.viewDetails = function (scope, index) {
    var book = scope.books[index];
    var bookUrl = 'https://interview-api-staging.bytemark.co/books/' + book.url.split('/book/')[1];
    $http( {
      method: 'GET',
      url: bookUrl
    })
      .success( function (response) { 
        document.getElementById('detail-title').innerHTML = response.title;
        document.getElementById('detail-author').innerHTML = response.author;
        document.getElementById('detail-categories').innerHTML = response.categories;
        document.getElementById('detail-publisher').innerHTML = response.publisher;
      })
      .error( function (response) {
        console.log(response);
        alert("Book is NOT deleted.");
      });
  };

 /**
   * ## add a new Book record
   */

   $scope.addBook = function () {
    $http({
      method: 'POST',
      url: 'https://interview-api-staging.bytemark.co/books',
      data: {
        title: $scope.book.title,
        author: $scope.book.author,
        categories: $scope.book.categories,
        publisher: $scope.book.publisher

      }
    })
      .success( function () { $location.path('/showAllBooks');})
      .error( function (response) {
        console.log(response);
        alert("OH! Book is NOT added");
      });
  };

  /**
   * ## updateBook
   */

  $scope.updateBook = function () {
     var bookUrl = 'https://interview-api-staging.bytemark.co/books/' + $scope.book.url.split('/book/')[1];
    $http({
      method: 'PUT',
      url: bookUrl,
      data: {
        title: $scope.book.title,
        author: $scope.book.author,
        categories: $scope.book.categories,
        publisher: $scope.book.publisher
      }
    })
      .success( function () { $location.path('/showAllBooks');})
      .error( function (response){
        console.log(response);
        alert("OH! Book is NOT updated");
      });
  };
  /**
   * ## Delete Book
   */

  $scope.destroyBook = function (scope,index) {
    var book = scope.books[index];
    var bookUrl = 'https://interview-api-staging.bytemark.co/books/' + book.url.split('/book/')[1];
    $http( {
      method: 'DELETE',
      url: bookUrl
    })
      .success( function (response) { 
        $route.reload();
      })
      .error( function (response) {
        console.log(response);
        alert("Book is NOT deleted.");
      });
  };

 // Clear all Book Data.
  $scope.clearDatabase = function () {
    $http({
      method: 'DELETE',
      url: 'https://interview-api-staging.bytemark.co/clean'
    })
      .success( function (response) {
        $route.reload();
      })
      .error( function (response, status, headers, config) {
        alert("OH! Something goes wrong. See the information in console.");
        console.log(response, status, headers, config);
      });
  };


}]);