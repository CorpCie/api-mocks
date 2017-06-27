const Definition = require('api-mocks').Definition;

const geoDefinition = require('../geo/geo-definition');

const MemberSchema = {
  id: 'member',
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        id: {
          type: 'double',
          chance: 'natural'
        },
        type: {
          type: 'string',
          enum: ['member']
        },
        attributes: {
          type: 'object',
          properties: {
            nickname: {
              type: 'string',
              chance: 'name'
            },
            birthdate: {
              type: 'string',
              chance: 'birthday'
            },
            registrationDate: {
              type: 'string',
              chance: 'date'
            },
            geo: {
              $ref: 'geo'
            }
          },
          required: [
            'aboid',
            'nickname',
            'birthdate',
            'registrationDate',
            'geo'
          ]
        }
      },
      required: [
        'id',
        'attributes',
        'type'
      ]
    }
  },
  required: [
    'data'
  ]
};

module.exports = new Definition(MemberSchema, [
  geoDefinition.schema
]);
