import LambdaContactForm from './LambdaContactForm';
import IEvent from './types/IEvent';

module.exports.handler = async (event: IEvent) => {
  const lambdaContactForm = new LambdaContactForm(event);
  return await lambdaContactForm.sendEmail();
};
