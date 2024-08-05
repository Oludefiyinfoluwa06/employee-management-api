import { registerAs } from '@nestjs/config';

export const CONFIG_DATABASE = 'database';

export default registerAs(CONFIG_DATABASE, () => ({
  ems: {
    uri: process.env.DB_URI,
  },
}));
