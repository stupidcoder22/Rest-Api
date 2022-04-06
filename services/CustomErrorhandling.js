class CustomErrorhandling extends Error {
  constructor(status, msg) {
    this.status = status;
    this.message = msg;
  }

  static alreadyExist(message) {
    return new CustomErrorhandling(409, message);
  }
}

export default CustomErrorhandling;
