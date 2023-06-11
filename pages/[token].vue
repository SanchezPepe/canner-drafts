<template>
  <div class="grid grid-cols-2 gap-2 bg-stone-900 p-2">
    <!-- Left panel -->
    <div>
      <!-- Logo -->
      <p
        class="bg-gray-800 self-center text-white text-2xl font-semibold whitespace-nowrap mb-2 rounded-lg p-2 border-gray-500 border"
      >
        CR's Drafts
      </p>

      <ul
        class="bg-gray-800 border-gray-500 items-center mb-2 w-full text-sm font-medium text-white border rounded-lg sm:flex"
      >
        <li
          v-for="(checkbox, index) in checkboxes"
          :key="index"
          :class="index !== 0 ? 'sm:border-l' : ''"
          class="w-full border-b border-gray-500 sm:border-b-0"
        >
          <div class="flex items-center pl-3">
            <input
              id="vue-checkbox-list"
              type="checkbox"
              :value="checkbox.checked"
              v-model="checkbox.checked"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              for="vue-checkbox-list"
              class="w-full py-3 ml-2 text-sm text-white font-semibold"
              >{{ checkbox.label }}
            </label>
          </div>
        </li>
      </ul>

      <div
        class="border border-gray-500 rounded-lg bg-gray-800 text-white p-4"
        :key="refresh"
      >
        <TextArea
          v-for="field in drafter"
          :key="field.label"
          @emitData="(data) => (field.text = data)"
          :rows="field.rows"
          :label="field.label"
          :text="field.text"
        ></TextArea>
      </div>

      <!-- Buttons -->
      <div class="grid grid-cols-2 gap-2 mt-2">
        <button
          @click="copyToClipboard"
          class="inline-flex items-center p-2 font-medium justify-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
        >
          Copy to clipboard
        </button>
        <button
          @click="clear"
          class="inline-flex items-center p-2 font-medium justify-center text-white bg-red-800 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-800"
        >
          Clear all
        </button>
      </div>
    </div>

    <!-- Right panel -->
    <div class="grid grid-cols-1 h-full gap-2">
      <!-- Case notes -->
      <div
        v-if="checkboxes[2].checked"
        class="border border-gray-500 rounded-lg bg-gray-800 text-white p-4"
      >
        <TextArea
          @emitData="(data) => (notes.text = data)"
          :label="notes.label"
          :rows="notes.rows"
          :text="notes.text"
        ></TextArea>
      </div>

      <!-- Chat -->
      <div
        v-if="checkboxes[1].checked"
        class="border border-gray-500 rounded-lg bg-gray-800 text-white p-4"
      >
        <label for="header" class="font-bold mb-2"> Chat </label>
        <div class="flex flex-row space-x-2 items-center">
          <input
            type="text"
            id="small-input"
            v-model="chat.key"
            class="w-full p-2 text-xs text-white border border-gray-500 rounded-lg bg-gray-900 focus:ring-blue-500 focus:border-blue-500"
          />

          <div v-if="loading" class="flex flex-col items-center">
            <div class="loading-spinner"></div>
          </div>
        </div>

        <hr class="h-px my-2 bg-gray-700 border-0" />

        <!-- Prompt -->
        <label for="header" class="font-bold"> Prompt </label>
        <!-- Checkbox with label tell a customer -->
        <div class="flex items-center mt-2">
          <input
            id="vue-checkbox"
            type="checkbox"
            v-model="chat.TAC"
            class="h-3 w-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label for="vue-checkbox" class="ml-2 text-xs text-gray-400"
            >TAC
          </label>
        </div>
        <div class="flex mt-2">
          <!-- Prompt -->
          <textarea
            class="w-full p-3 text-sm text-white border border-gray-500 rounded-l-lg bg-gray-900 focus:ring-blue-500 focus:border-blue-500"
            v-model="chat.prompt"
            required
            :rows="2"
          />

          <!-- Submit button -->
          <button
            @click="fetchGpt3Response"
            class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-r-lg text-sm px-4 py-2 dark:bg-blue-600"
          >
            Submit
          </button>
        </div>

        <br />

        <!-- Response -->
        <label for="header" class="font-bold"> Response </label>
        <p
          class="w-full mt-2 p-3 text-sm text-white border border-gray-500 rounded-lg bg-gray-900 focus:ring-blue-500 focus:border-blue-500"
          v-html="chat.response.message"
        ></p>

        <!-- copy to clipboard button -->
        <div class="grid grid-cols-2 gap-2 mt-2">
          <button
            @click="copyChatToClipboard"
            class="inline-flex items-center p-2 font-medium justify-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Copy to clipboard
          </button>
          <button
            @click="clearChat"
            class="inline-flex items-center p-2 font-medium justify-center text-white bg-red-800 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-800"
          >
            Clear
          </button>
        </div>

        <!-- API usage -->
        <div class="mt-4 text-xs text-gray-400">
          <p>API Usage:</p>
          <ul v-for="(value, index) in chat.response.usage">
            <li>{{ index }} - {{ value }}</li>
          </ul>
        </div>
      </div>

      <!-- Browser -->
      <div v-if="checkboxes[0].checked">
        <div class="flex">
          <input
            class="w-full p-3 text-sm text-white border border-gray-500 rounded-tl-lg bg-gray-900 focus:ring-blue-500 focus:border-blue-500"
            placeholder="URL"
            v-model="input"
            required
          />
          <button
            @click="url = input"
            class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-tr-lg text-sm px-4 py-2 dark:bg-blue-600"
          >
            Set
          </button>
        </div>
        <iframe class="rounded-b-lg h-[90%] w-full" :src="url"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const route = useRoute();

    onMounted(() => {
      if (route.params.token) {
        state.chat.key = "sk-" + route.params.token;
      } else {
        state.chat.key = "sk-";
      }
    });

    const state = reactive({
      drafter: {
        intro: {
          label: "Intro",
          text: "Hello team,",
          rows: 1,
        },
        body: {
          label: "Body",
          text: "",
          rows: 20,
        },
        signature: {
          label: "Signature",
          text: "",
          rows: 6,
        },
        references: {
          label: "References",
          text: "",
          rows: 5,
        },
      },
      notes: {
        label: "Case notes",
        text: "",
        rows: 0,
      },
      refresh: 0,
      loading: false,
      checkboxes: [
        { value: "url", label: "URL", checked: false },
        { value: "chat", label: "Chat", checked: true },
        { value: "notes", label: "Notes", checked: true },
      ],
      web: {
        input: "",
        url: "https://example.com",
      },
      chat: {
        TAC: true,
        key: "sk-",
        prompt: "",
        response: {
          message: "-",
        },
        tokens: ["Prompt", "Completion", "Total"],
      },
    });

    async function fetchGpt3Response() {
      state.loading = true;
      if (state.chat.TAC) {
        state.chat.prompt = "Tell a customer that " + state.chat.prompt;
      }

      await useFetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.chat.key}`,
        },
        body: {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: state.chat.prompt }],
          max_tokens: 200,
        },
      })
        .then((response) => {
          state.chat.response = response.data._rawValue;
          // remove line breaks

          // replace line breaks with <br />
          state.chat.response.message =
            state.chat.response.choices[0].message.content.replace(
              /\n/g,
              "<br />"
            );
        })
        .catch((error) => {
          console.error(error);
          alert(error.message);
        })
        .finally(() => {
          state.loading = false;
        });
    }

    function clear() {
      Object.keys(state.drafter).forEach((key) => {
        state.drafter[key].text = "";
      });

      state.refresh++;
    }

    function clearChat() {
      state.chat.prompt = "";
      state.chat.response.message = "-";
    }

    function copyToClipboard() {
      const text = `${this.drafter.intro.text}\n\n${this.drafter.body.text}\n\n${this.drafter.signature.text}\n\n${this.drafter.references.text}`;

      try {
        navigator.clipboard.writeText(text);
      } catch (error) {
        console.error("Failed to copy text: ", error);
      }
    }

    function copyChatToClipboard() {
      // replace br tags with line breaks
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
      clear,
      clearChat,
      fetchGpt3Response,
    };
  },
};
</script>

<style scoped>
.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
