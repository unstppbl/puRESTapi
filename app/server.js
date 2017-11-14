const config = require('config');
const http = require('http');
const host = require('./controllers/host');
const httpMsgs = require('./httpMsgs');

const port = config.get('server.port');
const server = http.createServer().listen(port, () => console.log(`Server listening at: ${port}`));

server.on('request', (req, resp) => {
  switch (req.method) {
    case 'GET': {
      if (req.url === '/') {
        httpMsgs.showHome(req, resp);
      } else if (req.url === '/hosts') {
        host.getHostsList(req, resp);
      } else {
        const regExCheck = '[0-9]+';
        const pattern = new RegExp(`/hosts/${regExCheck}`);
        if (pattern.test(req.url)) {
          const idPattern = new RegExp(regExCheck);
          const hostId = idPattern.exec(req.url);
          host.getHost(req, resp, hostId);
        } else {
          httpMsgs.show404(req, resp);
        }
      }
      break;
    }
    case 'POST': {
      if (req.url === '/hosts') {
        let reqBody = '';
        req.on('data', (data) => {
          reqBody += data;
          if (reqBody.length > 1e7) { // 10MB
            httpMsgs.show413(req, resp);
          }
        });
        req.on('end', () => {
          host.addHost(req, resp, reqBody);
        });
      } else {
        httpMsgs.show404(req, resp);
      }
      break;
    }
    case 'PUT': {
      if (req.url === '/hosts') {
        let reqBody = '';
        req.on('data', (data) => {
          reqBody += data;
          if (reqBody.length > 1e7) { // 10MB
            httpMsgs.show413(req, resp);
          }
        });
        req.on('end', () => {
          host.updateHost(req, resp, reqBody);
        });
      } else {
        httpMsgs.show404(req, resp);
      }
      break;
    }
    case 'DELETE': {
      if (req.url === '/hosts') {
        let reqBody = '';
        req.on('data', (data) => {
          reqBody += data;
          if (reqBody.length > 1e7) { // 10MB
            httpMsgs.show413(req, resp);
          }
        });
        req.on('end', () => {
          host.deleteHost(req, resp, reqBody);
        });
      } else {
        httpMsgs.show404(req, resp);
      }
      break;
    }
    default:
      httpMsgs.show405(req, resp);
      break;
  }
});
