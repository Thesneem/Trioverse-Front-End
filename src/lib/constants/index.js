import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    //HiOutlineAnnotation,
    HiOutlineQuestionMarkCircle,
    HiCash,
    HiFlag,
    HiOutlineTicket,
    HiOutlinePhotograph,
    HiOutlineDocumentReport,
    HiColorSwatch,
    HiOutlineCollection
    //HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'users',
        label: 'Users',
        path: '/admin/users',
        icon: <HiOutlineUsers />
    },
    {
        key: 'sellerapps',
        label: 'Sellers',
        path: '/admin/sellers',
        icon: <HiOutlineShoppingCart />
    },
    {
        key: 'orders',
        label: 'Orders',
        path: '/orders',
        icon: <HiOutlineShoppingCart />
    },
    // {
    //     key: 'listings',
    //     label: 'Listings',
    //     path: '/listings',
    //     icon: <HiOutlineCube />
    // },
    {
        key: 'transactions',
        label: 'Transactions',
        path: '/transactions',
        icon: <HiOutlineDocumentText />
    },
    {
        key: 'accounts',
        label: 'Accounts',
        path: '/accounts',
        icon: <HiCash />
    },
    {
        key: 'categories',
        label: 'Categories',
        path: '/admin/categories',
        icon: <HiColorSwatch />
    },
    {
        key: 'subcategories',
        label: 'Sub-Categories',
        path: '/admin/subCategories',
        icon: <HiOutlineCollection />
    },
    {
        key: 'packages',
        label: 'Packages',
        path: '/admin/packages',
        icon: <HiFlag />
    },

    {
        key: 'banners',
        label: 'Banners',
        path: '/banners',
        icon: <HiOutlinePhotograph />
    },
    {
        key: 'salesReport',
        label: 'Sales Report',
        path: '/admin/salesReport',
        icon: <HiOutlineDocumentReport />
    }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    //  {
    // key: 'settings',
    // label: 'Settings',
    // path: '/settings',
    // icon: <HiOutlineCog />
    // },
    // {
    //     key: 'support',
    //     label: 'Help & Support',
    //     path: '/support',
    //     icon: <HiOutlineQuestionMarkCircle />
    // }
]