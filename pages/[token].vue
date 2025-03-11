<template>
  <div class="grid grid-cols-2 gap-2 min-h-screen bg-gray-900 p-2">
    <!-- Left panel -->
    <div class="flex flex-col space-y-2">
      <!-- Logo and checkboxes -->
      <div
        class="flex w-full bg-gray-800 text-white text-2xl font-semibold whitespace-nowrap rounded-lg border-gray-500 border"
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

      <!-- Chat -->
      <div
        class="flex flex-col items-center space-y-2 border border-gray-500 rounded-lg bg-gray-800 text-white p-4"
      >
        <!-- Header -->
        <label class="font-bold text-xs text-gray-400">
          Chat: {{ chat.key }}
        </label>

        <!-- Options -->
        <div class="flex justify-between w-full">
          <div class="flex space-x-4">
            <label
              class="text-xs text-gray-400 flex flex-row items-center space-x-2"
              v-for="option in chat.options"
              :key="option.value"
            >
              <input
                class="h-3 w-3 text-blue-600 bg-gray-100 border-gray-300 rounded"
                type="radio"
                :value="option.value"
                :checked="chat.selectedRadio === option.value"
                @change="
                  (value) => {
                    chat.selectedRadio = value.target.value;
                  }
                "
              />
              <p class="font-bold">
                {{ option.value }}
              </p>
            </label>
          </div>
          <div v-if="loading" class="loading-spinner"></div>
        </div>

        <!-- Prompt -->
        <textarea
          @keypress.enter="fetchGeminiResponse"
          class="w-full p-3 text-sm text-white border border-gray-500 rounded-lg bg-gray-900 focus:ring-blue-500 focus:border-blue-500"
          v-model="chat.input"
          required
          :rows="10"
        />

        <!-- Buttons -->
        <div class="grid w-full">
          <button
            @click="fetchGeminiResponse"
            class="inline-flex items-center p-2 font-medium justify-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Submit
          </button>
        </div>
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

    <!-- Right panel -->
    <div
      class="border border-gray-500 rounded-lg bg-gray-800 text-white p-4 flex flex-col"
    >
      <!-- Drafter -->
      <div v-for="section in drafter">
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
  </div>
</template>

<script>
export default {
  setup() {
    const route = useRoute();

    onMounted(() => {
      state.chat.key = route.params.token;
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

    async function fetchGeminiResponse() {
      state.loading = true;

      const instructions = [
        "You are a Cloud Support Agent. Draft an email to tell a customer that ",
        ". Review grammar and spelling and make sure the message is clear and concise, feel free to add more details if needed.",
      ];

      switch (state.chat.selectedRadio) {
        case "TELLC":
          state.chat.query =
            instructions[0] + state.chat.input + instructions[1];
          break;
        case "ASKC":
          state.chat.query =
            instructions[0] +
            state.chat.input +
            " and ask for some information if missing and it's required to investigate further" +
            instructions[1];
          break;
        case "EMPTY":
          state.chat.query = state.chat.input;
          break;
        default:
          break;
      }

      const model = "gemini-2.0-flash";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${state.chat.key}`;
      const request = {
        contents: [
          {
            parts: [
              {
                text: state.chat.query,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 800,
          topP: 0.8,
          topK: 10,
        },
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        });

        const data = await response.json();
        state.chat.response.message = data.candidates[0].content.parts[0].text;
      } catch (error) {
        console.error(error);
      } finally {
        state.loading = false;
        useChat();
      }
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
      fetchGeminiResponse,
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
  width: 20px;
  height: 20px;
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
