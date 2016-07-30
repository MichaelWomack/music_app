angular.module('MusicApp').factory('Authentication', function($http, $q, AuthToken) {
  let auth = {};

  //handle login
  auth.login = (username, password) => {
    return $http.post('api/authenticate/login', {
      email: username,
      password: password
    })
    .success((data) => {
      AuthToken.setToken(data.token);
      return data;
    });
  };

  //handle logout
  auth.logout = () => {
    AuthToken.setToken();
  };

  //check if user is logged in
  auth.isLoggedIn = () => {
    if (AuthToken.getToken())
      return true;
    else
      return false;
  };

  //get user info
  auth.getUser = () => {
    if (AuthToken.getToken())
      return $http.get('api/authenticate/me', {cache: true});
    else {
      return $q.reject({message: 'User has no token.'});
    }
  };

  return auth;
})
.factory('AuthToken', function($window) {
  let authTokenFactory = {};

  //get token
  authTokenFactory.getToken = () => {
    return $window.localStorage.getItem('token');
  };

  //set token or clear token
  authTokenFactory.setToken = (token) => {
    if (token)
      $window.localStorage.setItem('token', token);
    else {
      $window.localStorage.removeItem('token');
    }
  };

  return authTokenFactory;
})
.factory('AuthInterceptor', function($q, $location, AuthToken) {
  let authInterceptor = {};

  //attach token to every request
  authInterceptor.request = (config) => {
    let token = AuthToken.getToken();
    if (token)
      config.headers['x-access-token'] = token;

    return config;
  };

  authInterceptor.requestError = (config) => {
    alert("Request Error");
  };

  //redirect if doesn't authenticate
  authInterceptor.responseError = (response) => {
    if (response.status == 403) {
      AuthToken.setToken();
      $location.path('/');
    }

    return $q.reject(response);
  };

  return authInterceptor;
});
