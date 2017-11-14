const db = require('../db');
const httpMsgs = require('../httpMsgs');

exports.getHostsList = async (req, resp) => {
  db.executeQuery('SELECT * FROM hosts', (data, err) => {
    if (err) {
      httpMsgs.show500(req, resp, err);
    } else {
      httpMsgs.sendJson(req, resp, data);
    }
  });
};

exports.getHost = async (req, resp, hostId) => {
  db.executeQuery(`SELECT * FROM hosts WHERE id=${hostId}`, (data, err) => {
    if (err) {
      httpMsgs.show500(req, resp, err);
    } else {
      httpMsgs.sendJson(req, resp, data);
    }
  });
};

exports.addHost = (req, resp, reqBody) => {
  try {
    if (!reqBody) {
      throw new Error('Input not valid');
    }
    const data = JSON.parse(reqBody);
    if (data) {
      const query = `INSERT INTO hosts (url) VALUES ('${data.url}')`;
      db.executeQuery(query, (data, err) => {
        if (err) {
          httpMsgs.show500(req, resp, err);
        } else {
          httpMsgs.send200(req, resp);
        }
      });
    } else {
      throw new Error('Input not valid');
    }
  } catch (ex) {
    httpMsgs.show500(req, resp, ex);
  }
};

exports.updateHost = (req, resp, reqBody) => {
  try {
    if (!reqBody) {
      throw new Error('Input not valid');
    }
    const data = JSON.parse(reqBody);
    if (data) {
      if (!data.id || !data.url) {
        throw new Error('Input not valid');
      }
      const query = `UPDATE hosts SET url = '${data.url}' WHERE id = ${data.id}`;
      db.executeQuery(query, (data, err) => {
        if (err) {
          httpMsgs.show500(req, resp, err);
        } else {
          httpMsgs.send200(req, resp);
        }
      });
    } else {
      throw new Error('Input not valid');
    }
  } catch (ex) {
    httpMsgs.show500(req, resp, ex);
  }
};

exports.deleteHost = (req, resp, reqBody) => {
  try {
    if (!reqBody) {
      throw new Error('Input not valid');
    }
    const data = JSON.parse(reqBody);
    if (data) {
      if (!data.id) {
        throw new Error('Input not valid');
      }
      const query = `DELETE FROM hosts WHERE id=${data.id}`;
      db.executeQuery(query, (data, err) => {
        if (err) {
          httpMsgs.show500(req, resp, err);
        } else {
          httpMsgs.send200(req, resp);
        }
      });
    } else {
      throw new Error('Input not valid');
    }
  } catch (ex) {
    httpMsgs.show500(req, resp, ex);
  }
};
