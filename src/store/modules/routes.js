// Just a mock data

const mockRoutes = [{
    path: '/example',
    component: '#',
    redirect: '/example/table',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'el-icon-s-help'
    },
    children: [{
        path: 'table',
        name: 'Table',
        component: '/table/index',
        meta: {
          title: 'Table',
          icon: 'table'
        }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: '/tree/index',
        meta: {
          title: 'Tree',
          icon: 'tree'
        }
      }
    ]
  },

  {
    path: '/form',
    component: '#',
    meta: {
      title: 'Form',
      icon: 'form'
    },
    children: [{
      path: 'index',
      name: 'Form',
      component: '/form/index',
      meta: {
        title: 'Form',
        icon: 'form'
      }
    }]
  },
  {
    path: '*',
    name: '404',
    redirect: '/home',
    hidden: true
  }
]

module.exports = {
  mockRoutes
}
