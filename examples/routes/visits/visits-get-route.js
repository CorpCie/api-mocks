const Route = require('api-mocks').Route;
const _ = require('lodash');

const visitDefinition = require('./visit-definition');
const memberDefinition = require('../members/member-definition');

// Create a list of visits with pagination query params
class VisitsGetRoute extends Route {
  constructor(request) {
    let pagination = {
      current_page: parseInt(_.get(request.query, 'page[number]', 1), 10),
      per_page: parseInt(_.get(request.query, 'page[size]', 20), 10),
      total: 7,
      total_pages: 7
    };
    let data = _.map(new Array(pagination.per_page), () => visitDefinition.getMock());
    let included = [];
    data.forEach(list => {
      let member = memberDefinition.getMock().data;
      member.id = list.relationships.member.data.id;

      included.push(member);
    });

    super({
      data,
      included,
      meta: {pagination}
    }, 200);
  }
}

module.exports = VisitsGetRoute;
