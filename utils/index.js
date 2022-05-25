const fs = require('fs');

function writeDataToFile(fileName, content) {
  fs.writeFileSync(fileName, JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function getDataFromBody(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunk) => {
        // Convert Buffer to string
        body += chunk.toString();
      });

      req.on('end', () => {
        // Convert string to JSON
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  writeDataToFile,
  getDataFromBody,
};
