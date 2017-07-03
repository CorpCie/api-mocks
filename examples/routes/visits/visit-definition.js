const Definition = require('api-mocks').Definition;

const VisitSchema = {
  id: 'visit',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      chance: 'natural'
    },
    type: {
      type: 'string',
      enum: ['visit']
    },
    attributes: {
      type: 'object',
      properties: {
        creationDate: {
          type: 'string',
          chance: 'date'
        }
      },
      required: ['creationDate']
    },
    relationships: {
      type: 'object',
      properties: {
        member: {
          data: {
            id: {
              type: 'string',
              chance: 'natural'
            },
            type: {
              type: 'string',
              enum: ['member']
            }
          }
        }
      },
      required: [
        'member'
      ]
    }
  },
  required: [
    'attributes',
    'relationships',
    'type',
    'id'
  ]
};

module.exports = new Definition(VisitSchema);
