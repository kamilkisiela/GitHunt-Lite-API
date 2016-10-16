import GitHub from  '../../mocks/github';

export class Repositories {
  getByFullName(fullName) {
    const brk = fullName.split('/'); // owner/name
    return GitHub.repository(brk[0], brk[1]); // owner, name
  }
}
