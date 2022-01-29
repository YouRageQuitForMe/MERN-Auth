class MyError {
    constructor(statusCode, statusMessage, res) {
      this.statusCode = statusCode;
      this.statusMessage = statusMessage;
      this.res = res;
      
    }
}

module.exports = MyError;