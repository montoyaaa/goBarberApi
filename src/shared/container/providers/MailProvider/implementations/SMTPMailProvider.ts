import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import mailConfig from '../../../../../config/mail';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class SMTPMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider
    ) {
        this.client = nodemailer.createTransport({
            host: 'smtp-relay.gmail.com',
            port: 587,
            secure: true, // upgrade later with STARTTLS
            service: 'Gmail',
            auth: {
                user: mailConfig.user,
                pass: mailConfig.password,
            },
        });
    }

    public async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMailDTO): Promise<void> {
        const { name, email } = mailConfig.defaults.from;

        await this.client.sendMail({
            from: {
                name: from?.name || name,
                address: from?.email || email,
            },
            to: {
                name: to.name,
                address: mailConfig.user,
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });
    }
}
