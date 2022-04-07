class CustomErrorhandling extends Error {
  constructor(status, msg) {
    super();
    this.status = status;
    this.message = msg;
  }

  static alreadyExist(message) {
    return new CustomErrorhandling(409, message);
  }

  static wrongCredential(message = "username and password is wrong") {
    return new CustomErrorhandling(401, message);
  }

  static unauthorized(message = "unAuthorized") {
    return new CustomErrorhandling(401, message);
  }

  static notFound(message = "User not found") {
    return new CustomErrorhandling(404, message);
  }
}

export default CustomErrorhandling;
