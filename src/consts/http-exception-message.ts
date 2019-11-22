export class HttpExceptionMessage {
  static user = class {
    static passwordsDoNotMatch = 'The password do not match the conformation password'
    static emailAlreadyInUse = 'An email is already in use'
    static usernameAlreadyInUse = 'A username is already in use'
    static previousPasswordIsIncorrect = 'The previous password is incorrect'
  }

  static auth = class {
    static credentialsAreWrong = 'Credentials are wrong'
  }
}
