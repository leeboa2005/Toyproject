import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home')
      },
      {
        path: '/Hannah',
        name: 'Hannah',
        component: () => import('../views/Hannah')
      },
      {
        path: '/Mingyu',
        name: 'Mingyu',
        component: () => import('../views/Mingyu')
      },
      {
        path: '/Boa',
        name: 'Boa',
        component: () => import('../views/Boa')
      }
    ]
  })
  
  export default router