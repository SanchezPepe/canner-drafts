// https://nuxt.com/docs/api/configuration/nuxt-config
import { NuxtConfig } from "@nuxt/types";

const config: NuxtConfig = {
  buildDir: "dist", // Specify the output directory for the built app
  head: {
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/tailwind.css"],
};

export default config;
