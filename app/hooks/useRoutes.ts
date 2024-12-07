import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat } from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2'
import { signOut } from "next-auth/react";
import useConservation from './useConversation'

const useRoutes = () => {
    const pathname = usePathname();
    const {conversationId} = useConservation();

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conservations',
            icon: HiChat,
            active: pathname === '/conservations' || !!conversationId
        },
        {
            label: 'Users',
            href: '/users',
            icon: HiUsers,
            active: pathname === '/users'
        },
        {
            label: 'Logout',
            href: '#',
            OnClick: () => signOut(),
            icon: HiArrowLeftOnRectangle,
        }

], [pathname, conversationId])
return routes;
}
export default useRoutes;