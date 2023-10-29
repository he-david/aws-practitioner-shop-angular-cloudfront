import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product:
      'https://3z9hj3o1z9.execute-api.us-east-1.amazonaws.com/dev/products',
    order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://bgtjm8a8n3.execute-api.us-east-1.amazonaws.com/dev',
    bff: 'https://3z9hj3o1z9.execute-api.us-east-1.amazonaws.com/dev',
    cart: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: true,
    bff: true,
    cart: false,
  },
};
