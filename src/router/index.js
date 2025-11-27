import { createRouter, createWebHistory } from "vue-router";
import { useLanguageStore } from "@/stores/language";
import { useSmoothScroll } from "@/composables/useSmoothScroll";
import { SECTION_ANCHORS } from "@/constants/sectionAnchors";

const HOME_ROUTE_NAMES = new Set(["Home", "HomeRu", "HomeEn"]);
const { scrollToElement } = useSmoothScroll();

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/HomePage.vue"),
    beforeEnter: (to, from, next) => {
      const savedLang = localStorage.getItem("language");
      if (!savedLang) {
        const browserLang = navigator.language || navigator.userLanguage;
        const lang = browserLang.toLowerCase().startsWith("ru") ? "ru" : "en";
        const langStore = useLanguageStore();
        langStore.setLanguage(lang);
      }
      next();
    },
  },
  {
    path: "/ru",
    name: "HomeRu",
    component: () => import("../pages/HomePage.vue"),
    beforeEnter: (to, from, next) => {
      const langStore = useLanguageStore();
      langStore.setLanguage("ru");
      next();
    },
  },
  {
    path: "/en",
    name: "HomeEn",
    component: () => import("../pages/HomePage.vue"),
    beforeEnter: (to, from, next) => {
      const langStore = useLanguageStore();
      langStore.setLanguage("en");
      next();
    },
  },
  {
    path: "/cases/:slug",
    name: "CaseDetail",
    component: () => import("../pages/CaseDetailPage.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Возвращаем promise, чтобы скроллить после завершения анимации перехода
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition);
          return;
        }

        if (HOME_ROUTE_NAMES.has(to.name)) {
          const target = document.getElementById(SECTION_ANCHORS.cases.section);
          if (target) {
            scrollToElement(target, { duration: 0 });
            resolve(false);
            return;
          }
        }

        resolve({ top: 0, behavior: "instant" });
      }, 50); // Задержка соответствует длительности fade-in анимации
    });
  },
});

export default router;
