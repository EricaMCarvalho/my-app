# Roma Doces de Vitrine

Customised eCommerce application with shopping cart, admin functionality and payment integration. Client built with React and server built with Node, Express and MongoDB.

## State management

- Redux used for state management (implemented with redux toolkit).

## Styles

- Mobile-first, fully responsive application;
- CSS (which include CSS Flexbox, Grid and Animations) generated with SASS;
- Customised navigation and other component styles.

## Security

- Users authenticated with email and encrypted passwords (using bcryptjs and a mongoose middleware);
- JSON web tokens stored in cookies for authorization;
- React lazy loading used to limit access to the code that powers private routes in the browser;
- Contact form sends emails with nodemailer and the Gmail API. OAuth2 is used so that security features don't need to be disabled on the google account;
- Nodemailer and the Gmail API (OAuth2) also used to handle e-mail verification and password recovery.
