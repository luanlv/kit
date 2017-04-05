/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

// import me from './queries/me';
import news from './queries/news';
import userQueries from './models/user/userQueries'
let user = userQueries.user
let userId = userQueries.userId
let users = userQueries.users
let listUser = userQueries.listUser
import userMutations from './models/user/userMutations'

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      news,
      user,
      userId,
      users,
      listUser
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    description: 'Realize Root Mutations',
    fields: {
      addUser: userMutations.addUser,
      updateUser: userMutations.updateUser
    },
  }),
});

export default schema;
