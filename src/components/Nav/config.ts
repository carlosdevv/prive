import { PrivateLayoutConfig } from './types'

export const privateLayoutConfig: PrivateLayoutConfig = {
  mainNav: [
    {
      title: 'Dashboard',
      href: '/dashboard'
    },
    {
      title: 'Configurações',
      href: '/settings'
    }
  ],
  dashboardNavBar: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Ativos',
      href: '/assets',
      icon: 'wallet'
    }
  ],
  userNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: 'home'
    }
  ]
}
