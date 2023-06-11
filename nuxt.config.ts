// https://nuxt.com/docs/api/configuration/nuxt-config
import { NuxtConfig } from "@nuxt/types";

const config: NuxtConfig = {
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/tailwind.css"],
};

export default config;
