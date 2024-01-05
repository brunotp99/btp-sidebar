import { Button } from "./components/button";
import DetachedSidebar from "./components/detached-sidebar";

import { GalleryHorizontal, LayoutDashboard, List, MenuSquare, Package, Palette, Settings, ShoppingBag } from "lucide-react";
const iconClasses = "h-5 w-5 text-gray-500 group-hover:text-gray-800 transition-colors";

const routes = [
    {
        href: `/`,
        label: "Overview",
        icon: <LayoutDashboard className={iconClasses} />,
    },
    {
        href: `/billboards`,
        label: "Billboards",
        icon: <GalleryHorizontal className={iconClasses} />,
    },
    {
        label: "Categories",
        icon: <List className={iconClasses} />,
        children: [
            {
                href: `/categories`,
                label: "Categories",
            },
            {
                href: `/subcategories`,
                label: "Subcategories",
            },
            {
                href: `/subcategoryitems`,
                label: "Subcategory Items",
            },
        ],
    },
    {
        href: `/attributes`,
        label: "Attributes",
        icon: <MenuSquare className={iconClasses} />,
    },
    {
        href: `/colors`,
        label: "Colors",
        icon: <Palette className={iconClasses} />,
    },
    {
        href: `/products`,
        label: "Products",
        icon: <ShoppingBag className={iconClasses} />,
    },
    {
        href: `/orders`,
        label: "Orders",
        icon: <Package className={iconClasses} />,
    },
    {
        href: `/settings`,
        label: "Settings",
        icon: <Settings className={iconClasses} />,
    },
];


function App() {
  return (
    <DetachedSidebar
        routes={routes}
    >
    
        <Button
            variant="default"
            onClick={() => console.log("Hello!")}
 
        >
            OLAAAAA
        </Button>
        <Button
            variant="secondary"
            onClick={() => console.log("Hello!")}
 
        >
            OLAAAAA
        </Button>
        <Button
            variant="outline"
            onClick={() => console.log("Hello!")}
 
        >
            OLAAAAA
        </Button>
        <Button
            variant="ghost"
            onClick={() => console.log("Hello!")}
 
        >
            OLAAAAA
        </Button>
        <Button
            variant="destructive"
            onClick={() => console.log("Hello!")}
 
        >
            OLAAAAA
        </Button>
        <Button
            variant="link"
            onClick={() => console.log("Hello!")}
 
        >
            OLAAAAA
        </Button>
        <div className="light">
            <p className="bg-red-500 dark:bg-blue-500 ">Ola!</p>
        </div>
    </DetachedSidebar>
  );  
}

export default App;