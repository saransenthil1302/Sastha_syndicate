const crypto = require('crypto');

window.crypto = {
  getRandomValues: function (buffer) {
    return crypto.randomFillSync(buffer);
  }
};
