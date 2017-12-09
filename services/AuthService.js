import buffer from 'buffer';
import { AsyncStorage } from 'react-native';
import { zipObject } from 'lodash';

export default class AuthService {
  constructor() {
    this.authKey = 'authKey';
    this.userKey = 'userKey';
  }
  encodeCreds(creds) {
    return new buffer.Buffer(creds.username + ':' + creds.password).toString('base64');
  }
  async getAuthInfo(cb) {
    const [authKey, userKey] = await AsyncStorage.multiGet([this.authKey, this.userKey]);
    const zippedObject = {
      [authKey[0]]: authKey[1],
      [userKey[0]]: userKey[1],
    }
    if (!zippedObject[this.authKey]) {
      return cb();
    }
    const authInfo = {
      header: {
        Authorization: 'Basic ' + zippedObject[this.authKey],
      },
      user: JSON.parse(zippedObject[this.userKey]),
    };
    return cb(null, authInfo);
  }
  async login(creds, cb) {
    try {
      const encodedAuth = this.encodeCreds(creds);
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': 'Basic ' + encodedAuth, 
        }
      });
      if (response.status >= 200 && response.status < 300) {
        const results = await response.json();
        AsyncStorage.multiSet([
          [this.authKey, encodedAuth],
          [this.userKey, JSON.stringify(results)]
        ], (err) => {
          console.log(err);
          if (err) {
            throw err;
          }
          return cb({ success: true });
        });
      }
      throw {
        badCredentials: response.status == 401,
        unknownError: response.status != 401,
        success: false,
      };
    }
    catch(err) {
      cb(err);
    } 
  }
}