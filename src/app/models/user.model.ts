import * as bcrypt from 'bcryptjs';

export class User {
  id: number;
  username: string;
  passwordHash: string;

  constructor(id: number, username: string, password: string) {
    this.id = id;
    this.username = username;
    this.passwordHash = this.hashPassword(password);
  }
  static generateId(): number {
    let lastUserId = parseInt(localStorage.getItem('lastUserId') || '0');
    lastUserId++;
    localStorage.setItem('lastUserId', lastUserId.toString());
    return lastUserId;
  }

  hashPassword(password: string): string {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
  }

  validatePassword(password: any): boolean {
    console.log(password, this.passwordHash)
    return bcrypt.compareSync(password, this.passwordHash);
  }
}