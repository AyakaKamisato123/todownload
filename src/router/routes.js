import { appRoute } from "./constants";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    redirect: { name: appRoute.DASHBOARD },
    name: appRoute.HOME,
    children: [
      {
        path: "dashboard",
        name: appRoute.DASHBOARD,
        component: () => import("pages/AppDashboard.vue"),
      },
      {
        path: "inventory",
        name: appRoute.PRODUCT_INVENTORY,
        component: () => import("pages/ProductInventory.vue"),
      },
      {
        path: "sales",
        name: appRoute.SALES_HISTORY,
        component: () => import("pages/ProductSales.vue"),
      },
      {
        path: "settings",
        name: appRoute.SETTINGS,
        component: () => import("pages/AppSettings.vue"),
      },
    ],
  },

  {
    path: "/products",
    component: () => import("layouts/PageStack.vue"),
    name: appRoute.PRODUCTS,
    children: [
      {
        path: "/add-product",
        name: appRoute.ADD_PRODUCT,
        component: () => import("pages/AddProduct.vue"),
      },
      {
        path: "/update-product/:id",
        name: appRoute.UPDATE_PRODUCT,
        component: () => import("pages/UpdateProduct.vue"),
      },
    ],
  },

  {
    path: "/point-of-sales",
    component: () => import("layouts/PageStack.vue"),
    redirect: { name: appRoute.POINT_OF_SALES },
    children: [
      {
        path: "products",
        name: appRoute.POINT_OF_SALES,
        component: () => import("pages/PointOfSales.vue"),
      },
    ],
  },

  {
    path: "/cart",
    component: () => import("layouts/PageStack.vue"),
    redirect: { name: appRoute.CART },
    children: [
      {
        path: "summary",
        name: appRoute.CART,
        component: () => import("pages/CartItems.vue"),
      },
    ],
  },

  {
    path: "/transaction",
    component: () => import("layouts/PageStack.vue"),
    redirect: { name: appRoute.VIEW_TRANSACTION },
    children: [
      {
        path: ":id",
        name: appRoute.VIEW_TRANSACTION,
        component: () => import("pages/TransactionSummary.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
