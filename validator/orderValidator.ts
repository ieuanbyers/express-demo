import dayjs = require('dayjs');
import { Order } from '../model/order';

module.exports.validateOrder = function (order: Order): string {
  const now = new Date();
  const date = dayjs(new Date(order.orderDate));
  const yearAgo = dayjs(now.setFullYear(now.getFullYear() - 1));
  if (date.isBefore(yearAgo)) {
    return 'Order date is longer than 1 year ago';
  }
  return null;
};
