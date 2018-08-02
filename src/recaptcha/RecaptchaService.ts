import * as rp from 'request-promise-native';

import IConfig from '../types/IConfig';
import IEvent from '../types/IEvent';

export default class RecaptchaService {
  private readonly _config: IConfig;
  private readonly _event: IEvent;

  constructor(config: IConfig, event: IEvent) {
    this._config = config;
    this._event = event;
  }

  public async makeValidationRequest(): Promise<void> {
    return await rp({
      json: true,
      method: 'POST',
      qs: {
        response: this._event.recaptchaToken,
        secret: this._config.recaptchaSecret,
      },
      url: this._config.recaptchaAddr,
    });
  }
}
