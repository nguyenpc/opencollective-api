import { get } from 'lodash';

import { GraphQLNonNull, GraphQLString } from 'graphql';

import { Application } from '../object/Application';

import { ApplicationInput } from '../input/ApplicationInput';

import models from '../../../models';

import * as errors from '../../errors';

function requireArgs(args, path) {
  if (!get(args, path))
    throw new errors.ValidationFailed({ message: `${path} required` });
}

export const createApplication = {
  type: Application,
  args: {
    application: {
      type: new GraphQLNonNull(ApplicationInput),
    },
  },
  async resolve(_, args, req) {
    if (!req.remoteUser) {
      throw new errors.Unauthorized(
        'You need to be authenticated to create an application.',
      );
    }

    requireArgs(args, 'application.type');

    if (args.application.type === 'oauth') {
      requireArgs(args, 'application.name');
    }

    const app = await models.Application.create({
      ...args.application,
      CreatedByUserId: req.remoteUser.id,
    });

    return app;
  },
};

export const updateApplication = {
  type: Application,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    application: {
      type: new GraphQLNonNull(ApplicationInput),
    },
  },
  async resolve(_, args, req) {
    const app = await models.Application.findById(args.id);
    if (!app) {
      throw new errors.NotFound({
        message: `Application with id ${args.id} not found`,
      });
    }

    if (!req.remoteUser) {
      throw new errors.Unauthorized(
        'You need to be authenticated to update an application.',
      );
    } else if (req.remoteUser.id !== app.CreatedByUserId) {
      throw new errors.Forbidden(
        'Authenticated user is not the application owner.',
      );
    }

    return await app.update(args.application);
  },
};

export const deleteApplication = {
  type: Application,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  async resolve(_, args, req) {
    const app = await models.Application.findById(args.id);
    if (!app) {
      throw new errors.NotFound({
        message: `Application with id ${args.id} not found`,
      });
    }

    if (!req.remoteUser) {
      throw new errors.Unauthorized(
        'You need to be authenticated to update an application.',
      );
    } else if (req.remoteUser.id !== app.CreatedByUserId) {
      throw new errors.Forbidden(
        'Authenticated user is not the application owner.',
      );
    }

    return await app.destroy();
  },
};
