var AdminRequire =  require.ensure([], require => {
    return {
      App: require('./Components/App').default,
      Dashboard: require('./dashboard/Admin').default,
      Library: require('./library/Library').default,
      Setting: require('./setting/Setting').default,
      Editor: require('./editor/Editor').default,
    }
  },
  'admin'
)

module.exports = AdminRequire
