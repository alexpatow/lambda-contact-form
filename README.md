# Lambda Contact Form

API Gateway and Lambda back-end for a contact form on a static site. Sends an email to a recipient using SES. Uses 
Google's recaptcha system to prevent spam.

## Installation
The easiest way to get this code running is to upload the Archive.zip to AWS lambda.

You will need to add the following environment variables:
- EMAIL_ADDRESS: the email address of the recipient of the contact form
- RECAPTCHA_ADDRESS: Address for Google's recaptcha service, https://www.google.com/recaptcha/api/siteverify
- RECAPTCHA_SECRET: Secret key for Google's recaptcha service 

## Request/Response Cycle
Steps:
- Authenticate recaptcha with Google's recaptcha service
- If it returns a token, store that token to use in the contact form request
- When the form is submitted, add the recaptcha token as a property in the JSON body
- API will send an email to the recipient
- Front end will receive response with standard status codes

API Request Body:
```json
{
  "name": "", // contact form's name field
  "email": "", // contact form's email field, the email of the person submitting the contact form
  "body": "", // contact form's message field, the message to be sent to the recipient
  "recaptchaToken": "" // token recieved after submitting request to Google's recaptcha service
}
```


