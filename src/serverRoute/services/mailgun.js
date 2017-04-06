var api_key = 'key-4639e67edf2df3a4c479a605e8376b9b';
var domain = 'edu.anabim.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


const from = 'ANABIM EDUCATION <edu.anabim@gmail.com>'

const RegisterMail = function(email, name) {
  return {
    from: from,
    to: email,
    subject: `Chào mừng ${name} đến với ANABIM EDUCATION!`,
    text: `Chúc mừng bạn đã là thành viên của Edu.anabim.com.
Chúng tôi hứa sẽ không ngừng nâng cao chất lượng dịch vụ của mình để giúp đỡ bạn nhiều nhất có thể.`
  }
}

const ActiveMail = function(email, name, activeUrl) {
  return {
    from: from,
    to: email,
    subject: `Kích hoạt tài khoản ${email} trên ANABIM EDUCATION!`,
    text: `Cám ơn ${name} đã đăng ký tài khoản trên Edu.anabim.com.
Để kích hoạt tài khoản bạn hay click vào link sau: ${activeUrl} `
  }
}

let Mailer = {}

Mailer.sendRegister = function (email, name) {
  mailgun.messages().send(RegisterMail(email, name), function (error, body) {
    console.log(body);
  });
}

Mailer.sendActiveMail = function (email, name, activeUrl) {
  mailgun.messages().send(ActiveMail(email, name, activeUrl), function (error, body) {
    console.log(body);
  });
}

export default Mailer
