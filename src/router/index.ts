import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/index",
    name: "index",
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: "//",
        name: "home",
        meta: { keepAlive: true, index: 1 },
        component: () => import("@/views/home/index.vue")
      },
      // 机器人选型
      // {
      //   path: "/modelSelection",
      //   name: "modelSelection",
      //   meta: { keepAlive: true, index: 5 },
      //   component: () => import("@/views/model-selection/index.vue")
      // },
      // 金典案例
      // {
      //   path: "/classicCases",
      //   name: "classicCases",
      //   meta: { keepAlive: true, index: 2 },
      //   component: () => import("@/views/classic-cases/index.vue")
      // },
      // 机器人小百科
      // {
      //   path: "/encyclopedia",
      //   name: "encyclopedia",
      //   meta: { keepAlive: true, index: 3 },
      //   component: () => import("@/views/encyclopedia/index.vue")
      // },
      // 查看已选
      // {
      //   path: "/viewSelected",
      //   name: "viewSelected",
      //   meta: { keepAlive: true, index: 4 },
      //   component: () => import("@/views/view-selected/index.vue")
      // }
    ]
  },
  // 查看已选
  {
    path: "/viewSelected",
    name: "viewSelected",
    meta: { keepAlive: true, index: 4 },
    component: () => import("@/views/view-selected/index.vue")
  },
  {
    path: "/selectionTypes",
    name: "selectionTypes",
    meta: { keepAlive: true, index: 5 },
    component: () => import("@/views/selection-types/index.vue")
  },
  {
    path: "/typesDetail",
    name: "typesDetail",
    meta: { keepAlive: true, index: 6 },
    component: () => import("@/views/types-detail/index.vue")
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 路由拦截器
router.beforeEach((to: any, from: any, next: any) => {
  // 路由切换动画 begin
  if (!from.meta.index) {
    store.commit("SET_TRANSITIONNAME", "slide-left");
  } else if (to.meta.index > from.meta.index) {
    store.commit("SET_TRANSITIONNAME", "slide-left");
  } else {
    store.commit("SET_TRANSITIONNAME", "slide-right");
  }
  // 路由切换动画 end
  next();
});

export default router;
