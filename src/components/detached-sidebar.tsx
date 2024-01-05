import { RefObject, cloneElement, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion"
import { ChevronDown, Menu } from "lucide-react";

import { Button } from "./button";

import { cn } from "../lib/utils";
import { SidebarProps } from "../types/sidebar-props";

type DropdownStates = {
    [key: string]: boolean;
};

const defaultBackDropAnimation = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
}

const defaultShowMenuAnimation = {
    enter: {
      opacity: 1,
      y: 0,
      display: "block",
      height: "auto"
    },
    exit: {
      y: -5,
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
      transitionEnd: {
        display: "none",
      },
    },
};

const DetachedSidebar = ({
    children, 
    routes, 
    iconStyle = "", 
    backdropAnimation = defaultBackDropAnimation,
    showMenuAnimation = defaultShowMenuAnimation,
    menuIcon = <Menu className="w-4 h-4" />
}: SidebarProps) => {

    const ref = useRef(null);
    const pathname = window.location.pathname;

    const [open, setOpen] = useState(false);
    
    const [dropdownStates, setDropdownStates] = useState<DropdownStates>({});

    const onDropdown = (dropdownId: string) => {
        setDropdownStates((prevState) => ({
            ...prevState,
            [dropdownId]: !prevState[dropdownId],
        }));
    };
    
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            const navRef: RefObject<HTMLDivElement> = ref;
            if (
                navRef.current &&
                !navRef.current.contains(e.target as Node) &&
                open
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, open]);
    
    const renderMenus = () => {

        return (
            <>
                {routes.map((route, index) => {
                    if (route.submenus) {
                        const key = index.toString();
                        return (
                            <li key={key}>
                                <Button
                                    variant="ghost"
                                    onClick={() => onDropdown(key)}
                                    className={cn(
                                        "w-full flex justify-start group transition-colors",
                                        (pathname === route.href) && `bg-[#fff] text-sidebar-active-text-color`
                                    )}
                                >
                                    <div className="flex gap-x-2 items-center justify-start w-full">
                                        {cloneElement(route.icon as React.ReactElement, {
                                          className: cn("h-5 w-5 text-gray-500 group-hover:text-gray-800 transition-colors", iconStyle),
                                        })}
                                        <span className={cn(`text-sidebar-text-color group-hover:text-sidebar-hover-text-color transition-colors`)}>
                                            {route.label}
                                        </span>
                                        <ChevronDown className={cn("text-sidebar-chevron-color w-4 h-4 ms-auto transition-all", !!dropdownStates[key] && "rotate-180")} />
                                    </div>
                                </Button>
                                <motion.div
                                  animate={!!dropdownStates[key] ? "enter" : "exit"}
                                  initial="exit"
                                  variants={showMenuAnimation}
                                >
                                    <ul className="py-2 space-y-2 ms-4">
                                        {route.submenus.map(
                                            (subcategory) => (
                                                <li
                                                    key={subcategory.label}
                                                    className="w-full"
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() => (console.log(subcategory.href))}
                                                        className="w-full flex justify-start group transition-colors text-sm"
                                                    >
                                                        <div className="flex items-center justify-start">
                                                            <span className={cn(`text-sidebar-text-color group-hover:text-sidebar-hover-text-color transition-colors`)}>
                                                                {
                                                                    subcategory.label
                                                                }
                                                            </span>
                                                        </div>
                                                    </Button>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </motion.div>
                            </li>
                        );
                    } else {
                        return (
                            <li key={route.label} className="w-full">
                                <Button
                                    variant="ghost"
                                    onClick={() => (console.log(route.href))}
                                    className={cn(
                                        "w-full flex justify-start group transition-colors",
                                        (pathname === route.href) && `bg-[#fff] text-sidebar-active-text-color`
                                    )}
                                >
                                    <div className="flex gap-x-2 items-center justify-start">
                                        <div className={cn((pathname === route.href) && `text-sidebar-active-text-color`)}>{route.icon}</div>
                                        <span className={cn(
                                                `text-sidebar-text-color group-hover:text-sidebar-hover-text-color transition-colors`, 
                                                (pathname === route.href) && `text-sidebar-active-text-color`
                                            )} 
                                        >
                                            {route.label}
                                        </span>
                                    </div>
                                </Button>
                            </li>
                        );
                    }
                })}
            </>
        );
    };  
    
    return (
        <div className="dark">
            <Button
                variant="default"
                size="icon"
                onClick={() => setOpen(!open)}
                className="sm:hidden m-4"
            >
                {menuIcon}
            </Button>
            
            <motion.div
              animate={open ? "open" : "closed"}
              variants={backdropAnimation}
            >
                <div
                    className={cn(
                        "absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity",
                        open ? "sm:hidden" : "hidden"
                    )}
                >
                </div>
            </motion.div>
            
            <aside
                ref={ref}
                className={cn(
                    "fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0",
                    open ? "translate-x-100" : "",
                )}
            >
                <div className="h-full py-4 overflow-y-auto bg-sidebar-bg ">
                    <div className="flex items-center justify-center w-full text-xl font-bold dark:text-white my-4">
                        <img src="/images/btp-dark.png" alt="Logo" className="h-[30px]" />
                    </div>
                   
                    <ul className="py-2 space-y-2 ms-4 pe-4">
                        {renderMenus()}
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DetachedSidebar;
