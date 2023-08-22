<template>
  <div class="grid grid-cols-3 gap-2 min-h-screen bg-gray-900 p-2">
    <!-- Left panel -->
    <div class="flex flex-col">
      <!-- Logo and checkboxes -->
      <div
        class="flex w-full mb-2 bg-gray-800 text-white text-2xl font-semibold whitespace-nowrap rounded-lg border-gray-500 border"
      >
        <p class="flex-1 ml-2 w-1/4 self-center border-r border-gray-500">
          CR's Drafts
        </p>

        <button
          @click="clearAll"
          class="flex-1 w-1/4 grow rounded-r-md text-sm text-white font-semibold bg-red-500"
        >
          Clear all
        </button>
      </div>

      <!-- Case notes -->
      <div
        class="border flex-1 h-full border-gray-500 rounded-lg bg-gray-800 text-white p-4"
      >
        <label class="font-bold"> {{ notes.label }} </label>
        <textarea
          v-model="notes.text"
          :rows="notes.rows"
          class="w-full h-[95%] p-4 rounded-xl my-2 text-sm text-white bg-gray-900 border-1 border-gray-500 focus:ring-0"
        ></textarea>
      </div>
    </div>

    <!-- Middle panel -->
    <div
      class="border border-gray-500 rounded-lg bg-gray-800 text-white p-4 flex flex-col"
    >
      <!-- Drafter -->
      <div v-for="section in drafter" :key="refresh">
        <label class="font-bold"> {{ section.label }} </label>
        <textarea
          v-model="section.text"
          :rows="section.rows"
          class="w-full p-4 rounded-xl my-2 text-sm text-white bg-gray-900 border-1 border-gray-500 focus:ring-0"
        ></textarea>
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
          @click="clearDraft"
          class="inline-flex items-center p-2 font-medium justify-center text-white bg-red-800 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-800"
        >
          Clear
        </button>
      </div>
    </div>

    <!-- Right panel -->
    <div class="flex flex-col space-y-2">
      <!-- Chat -->
      <div
        class="flex-1 h-full border border-gray-500 rounded-lg bg-gray-800 text-white p-4"
      >
        <div class="flex flex-row items-center space-x-2">
          <label for="header" class="flex grow font-bold text-sm">
            Chat: {{ chat.key }}
          </label>
          <div v-if="loading" class="loading-spinner"></div>
        </div>

        <hr class="my-2 border-gray-500" />

        <!-- Prompt -->
        <label for="header" class="font-bold"> Prompt </label>
        <!-- Radiogrup with label tell or ask a customer -->
        <div class="flex space-x-4 items-center w-full py-1 ml-1">
          <!-- Tell a customer -->

          <label
            :key="option.value"
            class="text-xs text-gray-400 flex flex-row items-center space-x-2"
            v-for="option in chat.options"
          >
            <input
              class="h-3 w-3 text-blue-600 bg-gray-100 border-gray-300 rounded"
              type="radio"
              :value="option.value"
              :checked="chat.selectedRadio === option.value"
              @change="
                (value) => {
                  console.log(value);
                  chat.selectedRadio = value.target.value;
                }
              "
            />
            <p class="font-bold">
              {{ option.value }}
            </p>
          </label>
        </div>

        <div class="flex my-2">
          <!-- Prompt -->
          <textarea
            class="w-full p-3 text-sm text-white border border-gray-500 rounded-lg bg-gray-900 focus:ring-blue-500 focus:border-blue-500"
            v-model="chat.input"
            required
            :rows="5"
          />
        </div>

        <!-- copy to clipboard button -->
        <div class="grid grid-cols-3 gap-2 mt-2">
          <button
            @click="fetchGpt3Response"
            class="inline-flex items-center p-2 font-medium justify-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Submit
          </button>
          <button
            @click="useChat"
            class="inline-flex items-center p-2 font-medium justify-center text-white bg-green-800 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-green-800"
          >
            Use
          </button>
          <button
            @click="clearChat"
            class="inline-flex items-center p-2 font-medium justify-center text-white bg-red-800 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-800"
          >
            Clear
          </button>
        </div>

        <!-- API usage -->
        <div class="my-2 text-xs text-gray-400 border border-gray-500 p-2">
          <p>API Usage:</p>
          Query: {{ chat.query }}
          <hr v-if="chat.query" class="my-1 border-gray-500" />
          <ul v-for="(value, index) in chat.response.usage">
            <li>{{ index }} - {{ value }}</li>
          </ul>
        </div>

        <!-- Response -->
        <label class="font-bold"> Response </label>
        <p
          class="mt-2 text-sm text-gray-400 border border-gray-500 p-2"
          v-html="chat.response.message"
        ></p>
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
        body: {
          label: "Body",
          text: "",
          rows: 25,
        },
        signature: {
          label: "Signature",
          text: "",
          rows: 4,
        },
        references: {
          label: "References",
          text: "",
          rows: 5,
        },
      },
      notes: {
        label: "Notes",
        text: "",
        rows: 15,
      },
      refresh: 0,
      loading: false,
      chat: {
        options: [
          { label: "Tell a customer that", value: "TELLC" },
          { label: "Ask a customer", value: "ASKC" },
          { label: "", value: "EMPTY" },
        ],
        key: "sk-",
        input: "",
        query: "",
        selectedRadio: "TELLC",
        response: {
          message: "-",
        },
        tokens: ["Prompt", "Completion", "Total"],
      },
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
        default:
          break;
      }

      await useFetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.chat.key}`,
        },
        body: {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: state.chat.query }],
          max_tokens: 500,
        },
      })
        .then((response) => {
          console.log(response);
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
      const text = `${this.drafter.body.text}\n\n${this.drafter.signature.text}\n\n${this.drafter.references.text}`;

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
      clearDraft,
      clearChat,
      clearAll,
      fetchGpt3Response,
      useChat,
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
