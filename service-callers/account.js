const { account: microservice } = require('../constants/microservices');
const ServiceCaller = require('../helpers/service-caller');

module.exports = class AccountServiceCaller {
  static async getUser({ id }) {
    return ServiceCaller.request(microservice, 'GET', `/user?id=${id}`);
  }
};
