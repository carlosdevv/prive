import { User } from '@prisma/client'
import { AvatarProps } from '@radix-ui/react-avatar'
import { Icons } from '../../Icons'
import { Avatar, AvatarFallback } from '../../ui/avatar'

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'name'>
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarFallback>
        <span className="sr-only">{user.name}</span>
        <Icons.logo className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  )
}
