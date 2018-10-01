import { GraphQLString, GraphQLObjectType, GraphQLDateTime } from 'graphql';

import { idEncode } from '../identifiers';

export const Application = new GraphQLObjectType({
  name: 'Application',
  description: 'Application model',
  fields: () => {
    return {
      id: {
        type: GraphQLString,
        resolve(application) {
          return idEncode(application.id, 'application');
        },
      },
      name: {
        type: GraphQLString,
        resolve(application) {
          return application.name;
        },
      },
      description: {
        type: GraphQLString,
        resolve(application) {
          return application.description;
        },
      },
      apiKey: {
        type: GraphQLString,
        resolve(application, args, req) {
          if (
            req.remoteUser &&
            req.remoteUser.id === application.CreatedByUserId
          ) {
            return application.apiKey;
          }
        },
      },
      clientId: {
        type: GraphQLString,
        resolve(application, args, req) {
          if (
            req.remoteUser &&
            req.remoteUser.id === application.CreatedByUserId
          ) {
            return application.clientId;
          }
        },
      },
      clientSecret: {
        type: GraphQLString,
        resolve(application, args, req) {
          if (
            req.remoteUser &&
            req.remoteUser.id === application.CreatedByUserId
          ) {
            return application.clientSecret;
          }
        },
      },
      callbackUrl: {
        type: GraphQLString,
        resolve(application, args, req) {
          if (
            req.remoteUser &&
            req.remoteUser.id === application.CreatedByUserId
          ) {
            return application.callbackUrl;
          }
        },
      },
      // createdAt: {
      //   type: GraphQLDateTime,
      //   resolve(application) {
      //     return application.createdAt;
      //   },
      // },
      // updatedAt: {
      //   type: GraphQLDateTime,
      //   resolve(application) {
      //     return application.updatedAt;
      //   },
      // },
    };
  },
});
