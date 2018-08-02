import * as AWS from 'aws-sdk';
import IConfig from '../types/IConfig';
import IEvent from '../types/IEvent';

export default class SESService {
  private readonly _config: IConfig;
  private readonly _event: IEvent;
  private readonly _sesInstance: AWS.SES;

  constructor(config: IConfig, event: IEvent) {
    this._config = config;
    this._event = event;
    this._sesInstance = new AWS.SES({
      apiVersion: '2010-12-01',
      region: 'us-east-1',
    });
  }

  public async makeRequest(): Promise<
    AWS.SES.SendEmailResponse | AWS.AWSError
  > {
    const params = this.getRequestParams();
    return await this._sesInstance.sendEmail(params).promise();
  }

  private getRequestParams(): AWS.SES.Types.SendEmailRequest {
    return {
      Destination: {
        ToAddresses: [this._config.sendEmailAddr],
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: this._event.body,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data:
            'Contact Form Message From: ' +
            this._event.name +
            ' Email: ' +
            this._event.email,
        },
      },
      Source: this._config.sendEmailAddr,
    };
  }
}
