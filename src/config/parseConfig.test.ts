import IConfig from '../types/IConfig';
import parseConfig from './parseConfig';

describe('parseConfig', () => {
  beforeAll(() => {
    process.env = {};
  });

  it('should successfully parse with valid config', () => {
    const expectation: IConfig = {
      recaptchaAddr: 'test',
      recaptchaSecret: 'test2',
      sendEmailAddr: 'test@test.com',
    };
    process.env = {
      EMAIL_ADDRESS: 'test@test.com',
      RECAPTCHA_ADDRESS: 'test',
      RECAPTCHA_SECRET: 'test2',
    };
    const response = parseConfig();
    expect(response).toEqual(expectation);
  });

  it('should throw with invalid config', () => {
    process.env = {
      RECAPTCHA_ADDRESS: 'test',
      RECAPTCHA_SECRET: 'test2',
    };

    expect.assertions(1);

    try {
      parseConfig();
    } catch (err) {
      expect(err).toEqual(new Error('missing required config properties'));
    }
  });
});
