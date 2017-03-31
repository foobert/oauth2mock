const http = require('http');

process.on('SIGTERM', () => { process.exit(); });

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const auth = req.headers['authorization'];
    if (auth == null) {
        console.log('Unauthorized');
        res.write(JSON.stringify({
            'authorities': [],
            'authenticated': false
        }));
    } else if (auth.startsWith('Bearer 0')) {
        console.log('SUPERUSER');
        res.write(JSON.stringify({
            'authorities': [{'authority': 'SUPERUSER'}],
            'authenticated': true
        }));
    } else if (auth.startsWith('Bearer 1')) {
        console.log('SUPERUSER');
        res.write(JSON.stringify({
            'authorities': [{'authority': 'LEGALADMIN'}],
            'authenticated': true
        }));
    } else {
        console.log('USER');
        res.write(JSON.stringify({
            'authorities': [{'authority': 'USER'}],
            'authenticated': true
        }));
    }
    res.end();
});
console.log('listening on *:8080');
server.listen(8080);
