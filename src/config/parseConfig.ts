import IConfig from '../types/IConfig';

export default function parseConfig(): IConfig {
  if (
    process.env.EMAIL_ADDRESS == null ||
    process.env.RECAPTCHA_ADDRESS == null ||
    process.env.RECAPTCHA_SECRET == null
  ) {
    throw new Error('missing required config properties');
  }
  return {
    recaptchaAddr: process.env.RECAPTCHA_ADDRESS,
    recaptchaSecret: process.env.RECAPTCHA_SECRET,
    sendEmailAddr: process.env.EMAIL_ADDRESS,
  };
}
