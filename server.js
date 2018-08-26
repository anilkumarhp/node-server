// Modules required
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// file types that will run on this server program
const fileTypes = {
  "html": "text/html",
  "js": "text/javascript",
  "css": "text/css",
  "jpg": "image/jpg",
  "jpeg": "image/jpeg",
    
};

http.createServer((req, res) => {
  let uri = url.parse(req.url).pathname;
  let fName = path.join(process.cwd(), unescape(uri));
  console.log('Loading'+uri);
  let stats;

  try{
  	stats = fs.lstatSync(fName);
  } catch(e) {
  	res.writeHead(404, {'Content-type': 'text/plain'});
  	res.write('404 Not Found\n');
  	res.end();
  	return;
  }
  if(stats.isFile()) {
  	let mimeType = fileTypes[path.extname(fName).split(".").reverse()[0]];
  	res.writeHead(200, {'Content-type': mimeType});
 
  	let fileStream = fs.createReadStream(fName);
  	fileStream.pipe(res);
  } else if(stats.isDirectory()) {
  	res.writeHead(302, {
  		'Location': 'index.html'
  	});
  	res.end();
  } else {
  	res.writeHead(500, {'Content-type':'text/plain'});
  	res.write('500 Internal Error\n');
  	res.end();
  }
}).listen(3000);


