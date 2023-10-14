import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product:
      'https://z7rcuyfja6.execute-api.us-east-1.amazonaws.com/dev/products',
    order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    bff: 'https://z7rcuyfja6.execute-api.us-east-1.amazonaws.com/dev',
    cart: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: false,
    bff: true,
    cart: false,
  },
};
