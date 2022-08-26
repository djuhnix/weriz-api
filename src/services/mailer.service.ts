import nodemailer from 'nodemailer';
import { MAILER_HOST, MAILER_PASS, MAILER_USER } from '@config';
import { logger } from '@utils/logger';
import path from 'path';
// tslint:disable-next-line: no-var-requires
const hbs = require('nodemailer-express-handlebars');

class MailerService {
  private transporter;
  private readonly defaultMailOptions;

  constructor() {
    this.defaultMailOptions = {
      from: MAILER_USER,
    };

    this.transporter = nodemailer.createTransport(
      {
        host: MAILER_HOST,
        port: 587,
        secure: false,
        tls: { rejectUnauthorized: false },
        // ignoreTLS: true,
        auth: {
          user: MAILER_USER,
          pass: MAILER_PASS,
        },
      },
      this.defaultMailOptions,
    );
    const viewPath = path.join(__dirname, '../mails/');
    this.transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extName: '.hbs',
          partialsDir: viewPath,
          layoutsDir: viewPath,
          defaultLayout: '',
        },
        viewPath: viewPath,
        extName: '.hbs',
      }),
    );

    logger.info('email transport init');
  }

  public async sendEmail(email: string, subject: string, template: string, context: object): Promise<boolean> {
    let result = true;
    await this.transporter.sendMail(
      {
        to: email,
        subject: subject,
        template: template,
        context: context,
      },
      (error, info) => {
        if (error) {
          logger.error('an error occurred while sending email');
          console.log(error);
          result = false;
        }
        if (info) logger.info('email sent', info);
      },
    );
    return result;
  }
}

export default MailerService;
