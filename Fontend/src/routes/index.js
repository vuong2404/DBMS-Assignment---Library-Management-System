import AdminLayout from "../layouts/AdminLayout";
import ManageBookPage from "../pages/Admin/ManageBook";
import ManageUserPage from "../pages/Admin/ManageUser";

export const adminRoutes = [
    {
        path: '/admin/books', component: ManageBookPage, layout: AdminLayout,
    },
    {
        path: '/admin/users', component: ManageUserPage, layout: AdminLayout
    },
    // {
    //     path: '/admin/book-requests', component: null, layout: AdminLayout
    // },
]