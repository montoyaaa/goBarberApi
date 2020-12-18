interface IMailConfig {
    driver: 'ethereal' | 'smtp';
    user: string;
    password: string;
    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,

    defaults: {
        from: {
            email: process.env.MAIL_USER,
            name: 'Ricardo Montoya',
        },
    },
} as IMailConfig;
