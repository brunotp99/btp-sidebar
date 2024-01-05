export interface SidebarProps {
    children: React.ReactNode;
    routes: RouteProps[];
    iconStyle?: string;
    backdropAnimation?: {};
    showMenuAnimation?: {};
    menuIcon?: React.ReactNode;
}

export interface RouteProps {
    href?: string;
    label: string;
    icon: React.ReactNode;
    submenus?: {
        label: string;
        href: string;
    }[]
}