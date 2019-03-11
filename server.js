const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req,res) => {
    
    // Build file path
    let filepath = path.join(__dirname,'public', req.url === '/' ? 'index.html' : req.url);

    // Extension of file
    let ext = path.extname(filepath);

    // Initial content type
    let contentType = 'text/html';

    // Check extinsion and set content type
    switch(ext) {
        case '.js':
            contentType ='text/javascript';
            break;
        case '.css':
            contentType ='text/css';
            break;
        case '.json':
            contentType ='application/json';
            break;
        case '.png':
            contentType ='image/png';
            break;
        case '.jpeg':
            contentType ='image/jpeg';
            break;
        case '.jpg':
            contentType ='image/jpg';
            break;
        case '.mp3':
            contentType ='video/mp3';
            break;
        case '.mp4':
            contentType ='video/mp4';
            break;
        
    }

    // Error handeling
    fs.readFile(filepath, (err,content) => {
        if(err) {
            if(err.code == 'ENOENT'){
                // Page not find
                fs.readFile(path.join(__dirname,'public','404.html'),(err,content) => {
                    
                    if(err) throw err;
                    res.writeHead(200,{'Content-Type':'text/html'});
                    
                    res.end(content,'utf8');
                });
            } else {
                // server error
                res.writeHead(500);
                res.end(`Server Error : ${err.code}`)
            }

        } else {
            res.writeHead(200,{'Content-Type': contentType});
            res.end(content,'utf8');
        }
    })

});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

