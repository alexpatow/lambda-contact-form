import * as rp from 'request-promise-native';

import IConfig from '../types/IConfig';
import IEvent from '../types/IEvent';
import RecaptchaService from './RecaptchaService';

const config: IConfig = {
  recaptchaAddr: 'test',
  recaptchaSecret: 'test',
  sendEmailAddr: 'test@test.com',
};
const event: IEvent = {
  body: 'test email',
  email: 'test2@test.com',
  name: 'test test',
  recaptchaToken: 'test',
};

jest.mock('request-promise-native');

describe('RecaptchaService', () => {
  let recaptchaService: any;
  beforeAll(() => {
    recaptchaService = new RecaptchaService(config, event);
  });
  it('should make a validation request', async () => {
    const rpMock = (rp as any).mockResolvedValue({ test: 'test' });
    const response = await recaptchaService.makeValidationRequest();
    expect(rpMock).toHaveBeenCalled();
    expect(rpMock).toHaveBeenCalledWith({
      json: true,
      method: 'POST',
      qs: {
        response: event.recaptchaToken,
        secret: config.recaptchaSecret,
      },
      url: config.recaptchaAddr,
    });
    expect(response).toEqual({ test: 'test' });
  });
});
