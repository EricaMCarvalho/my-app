# Roma Doces de Vitrine

## Security

- Users authenticated with email and encrypted passwords (using bcryptjs and a mongoose middleware);
- JSON web tokens stored in cookies for authorization;
- React lazy loading used to limit access to the code that powers private routes in the browser;
- Contact form sends emails with nodemailer and the Gmail API. OAuth2 is used so that security features don't need to be disabled on the google account;
