import LambdaContactFrom from './LambdaContactForm';
import IEvent from './types/IEvent';

const event: IEvent = {
  body: 'test email',
  email: 'test2@test.com',
  name: 'test test',
  recaptchaToken: 'test',
};

jest.mock('./config/parseConfig', () => ({
  default: () => ({
    recaptchaAddr: 'test',
    recaptchaSecret: 'test',
    sendEmailAddr: 'test@test.com',
  }),
}));

jest.mock('./ses/SESService');
jest.mock('./recaptcha/RecaptchaService');

describe('LambdaContactForm', () => {
  it('should send an email if everything is correct', async () => {
    const lambdaContactForm = new LambdaContactFrom(event) as any;
    lambdaContactForm._recaptchaService.makeValidationRequest.mockResolvedValue(
      'test'
    );
    lambdaContactForm._sesService.makeRequest.mockResolvedValue('test2');
    const response = await lambdaContactForm.sendEmail();
    expect(response).toEqual({
      recaptchaResponse: 'test',
      sesResponse: 'test2',
    });
  });

  it('should catch an error if there is one', async () => {
    const lambdaContactForm = new LambdaContactFrom(event) as any;
    lambdaContactForm._recaptchaService.makeValidationRequest.mockRejectedValue(
      new Error('test')
    );
    expect.assertions(1);
    try {
      await lambdaContactForm.sendEmail();
    } catch (err) {
      expect(err).toEqual(new Error('test'));
    }
  });
});
