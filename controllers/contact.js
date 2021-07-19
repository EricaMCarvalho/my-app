const catchAsync = require('../middleware/catchAsync');
const sendEmail = require('../utils/sendEmail');
const ErrorResponse = require('../utils/ErrorResponse');

/**
 * Route:       POST /api/contact
 * Description: Send contact email
 * Access:      Public
 */
exports.contact = catchAsync(async (req, res, next) => {
  const { name, email, tel, subject, message } = req.body;

  if (!name || !email || !tel || !subject || !message) {
    return next(new ErrorResponse('Por favor preencha todos os campos', 400));
  }

  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!regex.test(email)) {
    return next(
      new ErrorResponse('Por favor insira um endereço de email válido', 400)
    );
  }

  const mailOptions = {
    from: name,
    to: process.env.SHOP_EMAIL,
    subject: `Mensagem de ${name}: ${subject}`,
    text: `(Nome: ${name}. Email: ${email}. Telefone: ${tel}) Mensagem: ${message}`,
  };

  await sendEmail(mailOptions);

  res.status(200).json({ success: true });
});
