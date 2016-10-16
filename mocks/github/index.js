import { readFileSync } from 'fs';
import path from 'path'; 

const data = require('./data.json');

export default class GitHub {
  static repository(owner, name) {
    const combined = `${owner}/${name}`;
    const found = data.find(repo => repo.owner === owner && repo.name === name);

    return new Promise((resolve, reject) => {
      if (found) {
        resolve(found);
      } else {
        reject(`Repository '${combined}' not found`);
      }
    });
  }
} 