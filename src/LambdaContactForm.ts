import parseConfig from './config/parseConfig';
import RecaptchaService from './recaptcha/RecaptchaService';
import SESService from './ses/SESService';
import IEvent from './types/IEvent';
import logger from './utils/logger';

export default class LambdaContactForm {
  private readonly _recaptchaService: RecaptchaService;
  private readonly _sesService: SESService;

  constructor(event: IEvent) {
    const config = parseConfig();
    this._recaptchaService = new RecaptchaService(config, event);
    this._sesService = new SESService(config, event);
  }

  public async sendEmail() {
    logger.info('starting send email');
    try {
      const recaptchaResponse = await this._recaptchaService.makeValidationRequest();
      const sesResponse = await this._sesService.makeRequest();
      logger.info('email sent correctly');
      return {
        recaptchaResponse,
        sesResponse,
      };
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}
