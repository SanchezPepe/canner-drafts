import { useSSRContext, reactive, toRefs, mergeProps, unref, computed, ref, toRef, getCurrentInstance, onServerPrefetch } from 'vue';
import { a as useRoute, u as useNuxtApp, c as createError } from '../server.mjs';
import { hash } from 'ohash';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'h3';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'ufo';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'klona';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const getDefault = () => null;
function useAsyncData(...args) {
  var _a, _b, _c, _d, _e;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = (_a = options.server) != null ? _a : true;
  options.default = (_b = options.default) != null ? _b : getDefault;
  options.lazy = (_c = options.lazy) != null ? _c : false;
  options.immediate = (_d = options.immediate) != null ? _d : true;
  const nuxt = useNuxtApp();
  const getCachedData = () => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
  const hasCachedData = () => getCachedData() !== void 0;
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref((_e = getCachedData()) != null ? _e : options.default()),
      pending: ref(!hasCachedData()),
      error: toRef(nuxt.payload._errors, key)
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if ((opts._initial || nuxt.isHydrating && opts._initial !== false) && hasCachedData()) {
      return getCachedData();
    }
    asyncData.pending.value = true;
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((_result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = error;
      asyncData.data.value = unref(options.default());
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = createError(asyncData.error.value);
      }
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxt.hook("app:created", () => promise);
    }
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useRequestFetch() {
  var _a;
  const event = (_a = useNuxtApp().ssrContext) == null ? void 0 : _a.event;
  return (event == null ? void 0 : event.$fetch) || globalThis.$fetch;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _key = opts.key || hash([autoKey, unref(opts.baseURL), typeof request === "string" ? request : "", unref(opts.params || opts.query)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  const _request = computed(() => {
    let r = request;
    if (typeof r === "function") {
      r = r();
    }
    return unref(r);
  });
  if (!opts.baseURL && typeof _request.value === "string" && _request.value.startsWith("//")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch,
    immediate,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    watch: watch === false ? [] : [_fetchOptions, _request, ...watch || []]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const isLocalFetch = typeof _request.value === "string" && _request.value.startsWith("/");
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch && isLocalFetch) {
      _$fetch = useRequestFetch();
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
const _sfc_main = {
  setup() {
    useRoute();
    const state = reactive({
      drafter: {
        body: {
          label: "Body",
          text: "",
          rows: 25
        },
        signature: {
          label: "Signature",
          text: "",
          rows: 4
        },
        references: {
          label: "References",
          text: "",
          rows: 5
        }
      },
      notes: {
        label: "Notes",
        text: "",
        rows: 15
      },
      refresh: 0,
      loading: false,
      chat: {
        options: [
          { label: "Tell a customer that", value: "TELLC" },
          { label: "Ask a customer", value: "ASKC" },
          { label: "", value: "EMPTY" }
        ],
        key: "sk-",
        input: "",
        query: "",
        selectedRadio: "TELLC",
        response: {
          message: "-"
        },
        tokens: ["Prompt", "Completion", "Total"]
      }
    });
    async function fetchGpt3Response() {
      state.loading = true;
      switch (state.chat.selectedRadio) {
        case "TELLC":
          state.chat.query = "Tell a customer that " + state.chat.input;
          break;
        case "ASKC":
          state.chat.query = "Ask a customer " + state.chat.input;
          break;
        case "EMPTY":
          state.chat.query = state.chat.input;
          break;
      }
      await useFetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.chat.key}`
        },
        body: {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: state.chat.query }],
          max_tokens: 500
        }
      }, "$5KhHpJMoxT").then((response) => {
        console.log(response);
        state.chat.response = response.data._rawValue;
        state.chat.response.message = state.chat.response.choices[0].message.content.replace(
          /\n/g,
          "<br />"
        );
      }).catch((error) => {
        console.error(error);
        alert(error.message);
      }).finally(() => {
        state.loading = false;
      });
    }
    function clearDraft() {
      Object.keys(state.drafter).forEach((key) => {
        state.drafter[key].text = "";
      });
      state.refresh++;
    }
    function useChat() {
      const text = state.chat.response.message.replace(/<br\s*[\/]?>/gi, "\n");
      if (state.drafter.body.text.length > 0) {
        state.drafter.body.text += "\n\n=========================\n";
        state.drafter.body.text += text;
        state.drafter.body.text += "\n=========================";
      } else {
        state.drafter.body.text += text;
      }
      state.refresh++;
    }
    function clearChat() {
      state.chat.input = "";
      state.chat.response.message = "-";
    }
    function clearNotes() {
      state.notes.text = "";
    }
    function clearAll() {
      clearDraft();
      clearChat();
      clearNotes();
      state.refresh++;
    }
    function copyToClipboard() {
      const text = `${this.drafter.body.text}

${this.drafter.signature.text}

${this.drafter.references.text}`;
      try {
        navigator.clipboard.writeText(text);
      } catch (error) {
        console.error("Failed to copy text: ", error);
      }
    }
    function copyChatToClipboard() {
      const text = this.chat.response.message.replace(/<br\s*[\/]?>/gi, "\n");
      try {
        navigator.clipboard.writeText(text);
      } catch (error) {
        console.error("Failed to copy text: ", error);
      }
    }
    return {
      ...toRefs(state),
      copyToClipboard,
      copyChatToClipboard,
      clearDraft,
      clearChat,
      clearAll,
      fetchGpt3Response,
      useChat
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-3 gap-2 min-h-screen bg-gray-900 p-2" }, _attrs))} data-v-b572efb0><div class="flex flex-col" data-v-b572efb0><div class="flex w-full mb-2 bg-gray-800 text-white text-2xl font-semibold whitespace-nowrap rounded-lg border-gray-500 border" data-v-b572efb0><p class="flex-1 ml-2 w-1/4 self-center border-r border-gray-500" data-v-b572efb0> CR&#39;s Drafts </p><button class="flex-1 w-1/4 grow rounded-r-md text-sm text-white font-semibold bg-red-500" data-v-b572efb0> Clear all </button></div><div class="flex-1 h-full border border-gray-500 rounded-lg bg-gray-800 text-white p-4" data-v-b572efb0><div class="flex flex-row items-center space-x-2" data-v-b572efb0><label for="header" class="flex grow font-bold text-xs text-gray-400" data-v-b572efb0> Chat: ${ssrInterpolate(_ctx.chat.key)}</label>`);
  if (_ctx.loading) {
    _push(`<div class="loading-spinner" data-v-b572efb0></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><hr class="my-2 border-gray-500" data-v-b572efb0><div class="flex" data-v-b572efb0><label for="header" class="font-bold" data-v-b572efb0> Prompt </label><div class="flex justify-end space-x-4 items-center w-full py-1 ml-1" data-v-b572efb0><!--[-->`);
  ssrRenderList(_ctx.chat.options, (option) => {
    _push(`<label class="text-xs text-gray-400 flex flex-row items-center space-x-2" data-v-b572efb0><input class="h-3 w-3 text-blue-600 bg-gray-100 border-gray-300 rounded" type="radio"${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(_ctx.chat.selectedRadio === option.value) ? " checked" : ""} data-v-b572efb0><p class="font-bold" data-v-b572efb0>${ssrInterpolate(option.value)}</p></label>`);
  });
  _push(`<!--]--></div></div><div class="flex my-2" data-v-b572efb0><textarea class="w-full p-3 text-sm text-white border border-gray-500 rounded-lg bg-gray-900 focus:ring-blue-500 focus:border-blue-500" required${ssrRenderAttr("rows", 10)} data-v-b572efb0>${ssrInterpolate(_ctx.chat.input)}</textarea></div><div class="grid grid-cols-3 gap-2 mt-2" data-v-b572efb0><button class="inline-flex items-center p-2 font-medium justify-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800" data-v-b572efb0> Submit </button><button class="inline-flex items-center p-2 font-medium justify-center text-white bg-green-800 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-green-800" data-v-b572efb0> Use </button><button class="inline-flex items-center p-2 font-medium justify-center text-white bg-red-800 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-800" data-v-b572efb0> Clear </button></div><div class="mt-2" data-v-b572efb0><label class="font-bold" data-v-b572efb0> Response </label><p class="mt-2 text-sm text-gray-400 border border-gray-500 p-2" data-v-b572efb0>${_ctx.chat.response.message}</p></div></div></div><div class="border border-gray-500 rounded-lg bg-gray-800 text-white p-4 flex flex-col" data-v-b572efb0><!--[-->`);
  ssrRenderList(_ctx.drafter, (section) => {
    _push(`<div data-v-b572efb0><label class="font-bold" data-v-b572efb0>${ssrInterpolate(section.label)}</label><textarea${ssrRenderAttr("rows", section.rows)} class="w-full p-4 rounded-xl my-2 text-sm text-white bg-gray-900 border-1 border-gray-500 focus:ring-0" data-v-b572efb0>${ssrInterpolate(section.text)}</textarea></div>`);
  });
  _push(`<!--]--><div class="grid grid-cols-2 gap-2 mt-2" data-v-b572efb0><button class="inline-flex items-center p-2 font-medium justify-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800" data-v-b572efb0> Copy to clipboard </button><button class="inline-flex items-center p-2 font-medium justify-center text-white bg-red-800 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-800" data-v-b572efb0> Clear </button></div></div><div class="flex flex-col" data-v-b572efb0><div class="border flex-1 h-full border-gray-500 rounded-lg bg-gray-800 text-white p-4" data-v-b572efb0><label class="font-bold" data-v-b572efb0>${ssrInterpolate(_ctx.notes.label)}</label><textarea${ssrRenderAttr("rows", _ctx.notes.rows)} class="w-full h-[95%] p-4 rounded-xl my-2 text-sm text-white bg-gray-900 border-1 border-gray-500 focus:ring-0" data-v-b572efb0>${ssrInterpolate(_ctx.notes.text)}</textarea></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[token].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _token_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-b572efb0"]]);

export { _token_ as default };
//# sourceMappingURL=_token_-e6422d37.mjs.map
