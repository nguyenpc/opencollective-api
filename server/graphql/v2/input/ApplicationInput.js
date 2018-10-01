import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInputObjectType,
} from 'graphql';

const ApplicationType = new GraphQLEnumType({
  name: 'ApplicationType',
  description: 'All application types',
  values: {
    API_KEY: { value: 'apiKey' },
    OAUTH: { value: 'oAuth' },
  },
});

export const ApplicationInput = new GraphQLInputObjectType({
  name: 'ApplicationInput',
  description: 'Input type for Application',
  fields: () => ({
    type: { type: new GraphQLNonNull(ApplicationType) },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    callbackUrl: { type: GraphQLString },
  }),
});
