import * as user from './user';
import * as chat from './chat';
import * as order from './order';
import * as product from './product';

export default {
  ...user,
  ...chat,
  ...order,
  ...product,
};
