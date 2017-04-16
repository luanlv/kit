var AdminRequire =  require.ensure([], require => {
    return {
      App: require('./Components/App').default,
      Dashboard: require('./dashboard/Admin').default,
      Library: require('./library/Library').default,
      Setting: require('./setting/Setting').default,
      Editor: require('./editor/Editor').default,
      ListNews: require('./news/ListNews').default,
      EditNews: require('./news/EditNews').default,
      EditFoods: require('./monngon/EditFoods').default,
      ListFoods: require('./monngon/ListFoods').default
    }
  }
)

module.exports = AdminRequire
