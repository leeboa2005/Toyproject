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
        path: '/HaeNa',
        name: 'HaeNa',
        component: () => import('../views/HaeNa')
      },
      {
        path: '/Mingue',
        name: 'Mingue',
        component: () => import('../views/Mingue')
      },
      {
        path: '/Boa',
        name: 'Boa',
        component: () => import('../views/Boa')
      }
    ]
  })
  
  export default router