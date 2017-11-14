const config = require('config');

const format = config.get('httpMsgsForm.format');

exports.sendJson = (req, resp, data) => {
  resp.writeHead(200, { 'Content-Type': 'application/json' });
  if (data) {
    resp.write(JSON.stringify(data.rows, null, 2));
  }
  resp.end();
};

exports.showHome = (req, resp) => {
  if (format === 'HTML') {
    resp.writeHead(200, { 'Content-Type': 'text/html' });
    resp.write(`<html><head><title>Home</title></head><body>Valid endpoints:
      <br>/hosts - GET - To list all hosts
      <br>/hosts/{hostID} - GET - To search for a host
      </body></html>`);
  }
  if (format !== 'HTML') {
    resp.writeHead(200, { 'Content-Type': 'application/json' });
    resp.write(JSON.stringify([
      { url: '/hosts', operation: 'GET', description: 'To list all hosts' },
      { url: '/hosts/<id>', operation: 'GET', description: 'To search for a host' }]));
  }
  resp.end();
};

exports.send200 = (req, resp) => {
  resp.writeHead(200, { 'Content-Type': 'application/json' });
  resp.end();
};

exports.show500 = (req, resp, err) => {
  if (format === 'HTML') {
    resp.writeHead(500, 'Internal error occured', { 'Content-Type': 'text/html' });
    resp.write(`<html><head><title>500</title></head><body>500: Internal Error. Details: ${err}</body></html>`);
  }
  if (format !== 'HTML') {
    resp.writeHead(500, 'Internal error occured', { 'Content-Type': 'application/json' });
    resp.write(JSON.stringify({ data: `ERROR occured: ${err}` }));
  }
  resp.end();
};

exports.show405 = (req, resp) => {
  if (format === 'HTML') {
    resp.writeHead(405, 'Method is not supported', { 'Content-Type': 'text/html' });
    resp.write('<html><head><title>405</title></head><body>405: Method is not supported</body></html>');
  }
  if (format !== 'HTML') {
    resp.writeHead(405, 'Method is not supported', { 'Content-Type': 'application/json' });
    resp.write(JSON.stringify({ data: 'Method is not supported' }));
  }
  resp.end();
};

exports.show404 = (req, resp) => {
  if (format === 'HTML') {
    resp.writeHead(404, 'Resource not found', { 'Content-Type': 'text/html' });
    resp.write('<html><head><title>404</title></head><body>404: Resource not found</body></html>');
  }
  if (format !== 'HTML') {
    resp.writeHead(404, 'Resource not found', { 'Content-Type': 'application/json' });
    resp.write(JSON.stringify({ data: 'Resource not found' }));
  }
  resp.end();
};

exports.show413 = (req, resp) => {
  if (format === 'HTML') {
    resp.writeHead(413, 'Request entity too large', { 'Content-Type': 'text/html' });
    resp.write('<html><head><title>413</title></head><body>413: Request entity too large</body></html>');
  }
  if (format !== 'HTML') {
    resp.writeHead(413, 'Request entity too large', { 'Content-Type': 'application/json' });
    resp.write(JSON.stringify({ data: 'Request entity too large' }));
  }
  resp.end();
};
