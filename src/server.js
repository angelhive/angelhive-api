/**
 * Copyright (C) 2016, AngelHive Co.,Ltd. All Rights Reserved.
 *
 * Unauthorized copying of this source code, via any medium is strictly prohibited.
 *
 * THIS SOFTWARE IS PROPRIETARY AND CONFIDENTIAL.
 */

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  } from 'graphql';
import graphqlHTTP from 'express-graphql';
import logger from './logger';

const data = require('../data.json');

// Define the User type with two string fields: `id` and `name`.
// The type of User is GraphQLObjectType, which has child fields
// with their own types (in this case, GraphQLString).
const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  },
});

// Define the schema with one top-level field, `user`, that
// takes an `id` argument and returns the User with that ID.
// Note that the `query` is a GraphQLObjectType, just like User.
// The `user` field, however, is a userType, which we defined above.
const schema2 = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        // `args` describes the arguments that the `user` query accepts
        args: {
          id: { type: GraphQLString },
        },
        // The resolve function describes how to "resolve" or fulfill
        // the incoming query.
        // In this case we use the `id` argument from above as a key
        // to get the User from `data`
        resolve: (_, args) => data[args.id],
      },
    },
  }),
});

const app = express();

app.set('port', (process.env.PORT || 5000));
app.set('trust proxy', true);

app.use(morgan('combined', { stream: logger.stream }));
app.use(helmet());

app.use('/graphql', graphqlHTTP({ schema: schema2, pretty: true }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(app.get('port'), () => {
  logger.info('Example app listening on port', app.get('port'));
});
