const Definition = require('api-mocks').Definition;

const GeoSchema = {
  id: 'geo',
  type: 'object',
  properties: {
    country: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          chance: 'country'
        },
        name: {
          type: 'string',
          chance: {
            country: {full: true}
          }
        }
      },
      required: [
        'code',
        'name'
      ]
    },
    region: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          chance: {
            province: {full: true}
          }
        }
      },
      required: ['name']
    },
    city: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          chance: 'city'
        },
        latitude: {
          type: 'string',
          chance: 'latitude'
        },
        longitude: {
          type: 'string',
          chance: 'longitude'
        }
      },
      required: ['name', 'latitude', 'longitude']
    }
  },
  required: [
    'country',
    'region',
    'city'
  ]
};

module.exports = new Definition(GeoSchema);
