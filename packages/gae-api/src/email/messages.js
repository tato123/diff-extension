import transporter from './transporter';

const defaultFrom = 'Diff <diff-noreply@getdiff.app>';

const signupEmail = ({ from = defaultFrom, to, name }) => {
  const mail = {
    from,
    to,
    subject: 'Beta Signup',
    template: 'earlySignup',
    context: {
      name
    }
  };
  return transporter.sendMail(mail);
};

export default {
  signupEmail
};
