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
import imageQueries from './models/image/queries'
import userQueries from './models/user/queries'
import settingQueries from './models/setting/queries'

// mutation
import settingMutation from './models/setting/mutations'

let {listImage} = imageQueries
let { users } = userQueries
let { setting } = settingQueries

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      setting,
      news,
      listImage,
      users
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    description: 'Realize Root Mutations',
    fields: {
      // addUser: userMutations.addUser,
      // updateUser: userMutations.updateUser
      updateSetting: settingMutation.update
    },
  }),
});

export default schema;
