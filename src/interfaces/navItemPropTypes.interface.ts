import { MouseEventHandler } from "react";
import { IconType } from "react-icons/lib";

export interface NavItemPropsTypes {
    userInfoAlign: string;
    sidebar: string;
    icon: IconType;
    menuName: string;
    mt: string;
    iconColor: string;
    showMenuItem?: boolean;
    isLink?: boolean;
    handleNavClick?: MouseEventHandler;
    title: string;
    menuItems?: { course: string; href: string }[];
    active?: boolean;
    route?: any;
    setShowSideBar: Function;
    showSidebar?: Boolean
    mobileSideBarActive?: Boolean
}


export interface NavHoverBoxPropTypes {
    mouseEnterEvent: MouseEventHandler;
    mouseLeaveEvent: MouseEventHandler;
    showMenuItem?: boolean;
    title: string;
    menuItems?: { course: string; href: string }[];
}
