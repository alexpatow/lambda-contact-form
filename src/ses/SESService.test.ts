import IConfig from '../types/IConfig';
import IEvent from '../types/IEvent';
import SESService from './SESService';

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

const emailRequest = {
  Destination: { ToAddresses: ['test@test.com'] },
  Message: {
    Body: { Text: { Charset: 'UTF-8', Data: 'test email' } },
    Subject: {
      Charset: 'UTF-8',
      Data: 'Contact Form Message From: test test Email: test2@test.com',
    },
  },
  Source: 'test@test.com',
};

describe('SESService', () => {
  let sesService: any;

  beforeAll(() => {
    sesService = new SESService(config, event);
    sesService._sesInstance.sendEmail = jest.fn().mockReturnValue({
      promise: jest.fn().mockReturnValue({}),
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should make an email request', async () => {
    const paramsSpy = jest.spyOn(sesService, 'getRequestParams');
    const response = await sesService.makeRequest();
    expect(sesService._config).toEqual(config);
    expect(sesService._event).toEqual(event);
    expect(sesService._sesInstance).toBeDefined();
    expect(paramsSpy).toBeCalled();
    expect(sesService._sesInstance.sendEmail).toBeCalledWith(emailRequest);
    expect(response).toBeDefined();
  });
});
