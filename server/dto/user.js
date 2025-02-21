class UserDto {
  constructor(userData) {
    this._id = userData._id;
    this.username = userData.username;
    this.email = userData.email;
    this.avatarImage = userData.avatarImage;
  }
}

export { UserDto };
