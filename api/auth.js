export class Auth {
  constructor() {
    this.user = undefined; 
  }

  getUser() {
    return this.user;
  }

  login() {
    this.user = {
      login: 'kamil'
    };
  }

  logout() {
    this.user = undefined;
  }
}