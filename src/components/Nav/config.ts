import { BASE_ROUTES, DASHBOARD_ROUTES } from '@/lib/routes'
import { PrivateLayoutConfig } from './types'

export const privateLayoutConfig: PrivateLayoutConfig = {
  mainNav: [
    {
      title: 'Dashboard',
      href: `${BASE_ROUTES.DASHBOARD}`
    },
    {
      title: 'Configurações',
      href: `${BASE_ROUTES.SETTINGS}`
    }
  ],
  dashboardNavBar: [
    {
      title: 'Dashboard',
      href: `${BASE_ROUTES.DASHBOARD}/${DASHBOARD_ROUTES.HOME}`,
      icon: 'home'
    },
    {
      title: 'Ativos',
      href: `${BASE_ROUTES.DASHBOARD}/${DASHBOARD_ROUTES.ASSETS}?tabSelected=RENDA_FIXA`,
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
