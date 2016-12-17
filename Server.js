var http = require('http');
var port=process.env.PORT;
var querystring = require('querystring');
var utils = require('util');
var url = require("url");
      
var server = http.createServer(function(req, res) 
{
  switch (req.url) 
  { 
    // se verifica la solicitud

    // home page
    case '/':
      homePageHandler (req, res); 
      break;
    
    // registro
    case '/register':  
      registerFormHandler (req, res);
      break;
    
    // not found si accede a algo que no existe
    default:
      nofoundHandler (req, res);
      break;
  }

});

server.listen(port);

// función que despliega el formulario
function homePageHandler (req, res) 
{
  
  res.writeHead(200, {'Content-Type': 'text/html'});

  // fomulario a desplegar
  var body = '<html>'+
  '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
  '</head>'+
  '<body>'+
    '<form action="/register" method="post">'+
      'Name:<input type=text value="" name="name" size=15></br>'+
      'Email:<input type=text value="" name="email" size=15></br>'+
      '<input type="submit" value="Absenden" />'+
    '</form>'+
  '</body>'+
  '</html>';
  
  // contenido de la respuesta
  res.end(body);
}
    
// funcion que maneja el post
function registerFormHandler (req, res) 
{
    // en caso que se desee conocer de que controlador vino la solicitud
    //var pathname = url.parse(req.url).pathname;

    var postData = "";   

    req.on('data', function(chunk) 
    {

      // agregamos los daton que recibimos
      postData += chunk.toString();

    });   
    
    req.on('end', function() 
    {

      // ... proceso de datos
      res.writeHead(200, "OK", {'Content-Type': 'text/html'});      
      
      // parse de los datos enviados
      var decodedBody = querystring.parse(postData);      
      
      // output de los datos decodificados         
      res.write('<html><head><title>Demo Anwendung</title></head><body><pre>');
      res.write(utils.inspect(decodedBody));    
      res.write('</pre></body></html>');       
      res.end();

    });
}

// handler para controlador que no existe
function nofoundHandler(req, res) 
{
      
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('404 Error - Request handler not found'); 
}
