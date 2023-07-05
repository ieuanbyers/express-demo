import { Customer } from '../model/customer';
const axios = require('axios');

module.exports.getCustomers = async function (): Promise<Customer> {
  try {
    const response = await axios.get('http://localhost:8080/api/customers');

    return response.data;
  } catch (e) {
    throw new Error('Could not get customers');
  }
};
