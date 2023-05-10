import { Icons } from '@/components/Icons'

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type UserNavItem = {
  icon?: keyof typeof Icons
  href?: string
  onClick?: () => void
} & Pick<NavItem, 'title' | 'disabled'>

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: any[]
    }
)

export type PrivateLayoutConfig = {
  mainNav: MainNavItem[]
  dashboardNavBar: SidebarNavItem[]
  userNav: UserNavItem[]
}
