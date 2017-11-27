import buffer from 'buffer';

export default class AuthService {
  encodeCreds(creds) {
    return new buffer.Buffer(creds.username + ':' + creds.password).toString('base64');
  }
  async login(creds, cb) {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': 'Basic ' + this.encodeCreds(creds), 
        }
      });
      if (response.status >= 200 && response.status < 300) {
        const results = await response.json();
        console.log(results);
        return cb({ success: true });
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