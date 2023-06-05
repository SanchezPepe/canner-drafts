<template>
  <div class="grid grid-cols-2 gap-2 h-screen bg-stone-900 p-2">
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

      <div class="border border-gray-500 rounded-lg bg-gray-800 text-white p-4">
        <!-- Intro -->
        <TextArea
          @emitData="(data) => (header = data)"
          :rows="1"
          label="Intro"
          :text="header"
        ></TextArea>

        <!-- Body -->
        <TextArea
          @emitData="(data) => (body = data)"
          :rows="20"
          label="Body"
          :text="body"
        ></TextArea>

        <!-- Signature -->
        <TextArea
          @emitData="(data) => (signature = data)"
          :rows="6"
          label="Signature"
          :text="signature"
        ></TextArea>

        <!-- References -->
        <TextArea
          @emitData="(data) => (references = data)"
          :rows="5"
          label="References"
          :text="references"
        ></TextArea>

        <!-- Buttons -->
        <div class="grid grid-cols-2 gap-2 m-4">
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
    </div>

    <!-- Right panel -->
    <div class="grid grid-cols-1 h-full gap-2">
      <!-- Case notes -->
      <div
        v-if="checkboxes[2].checked"
        class="border border-gray-500 rounded-lg bg-gray-800 text-white p-4"
      >
        <TextArea
          @emitData="(data) => (notes = data)"
          label="Case notes"
          :rows="0"
          :text="notes"
        ></TextArea>
      </div>

      <!-- Chat -->
      <div class="border border-gray-500 rounded-lg bg-gray-800 text-white p-4">
        <label for="header" class="font-bold"> Chat </label>

        <hr class="h-px my-2 bg-gray-700 border-0" />

        <label for="header" class="font-bold"> Prompt </label>
        <div class="flex mt-2">
          <!-- Prompt -->
          <textarea
            class="w-full p-3 text-sm text-white border border-gray-500 rounded-l-lg bg-gray-900 focus:ring-blue-500 focus:border-blue-500"
            v-model="prompt"
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
        <TextArea
          @emitData="(data) => (response = data)"
          label="Response"
          :rows="20"
          :disabled="true"
          :text="response"
        ></TextArea>
      </div>

      <!-- Browser -->
      <div v-if="checkboxes[1].checked">
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
    const state = reactive({
      checkboxes: [
        { value: "chat", label: "Chat", checked: false },
        { value: "url", label: "URL", checked: false },
        { value: "notes", label: "Notes", checked: true },
      ],
      url: "https://example.com",
      input: "",
      signature: "",
      references: "",
      body: "",
      notes: "",
      header: "Hello team,",
      prompt: "2+43243",
      response: "",
      key: "Bearer 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",
    });

    async function fetchGpt3Response() {
      const { post } = useFetch("/api/chat");

      try {
        const res = await post({
          prompt: prompt.value,
        });

        console.log(",fs,", res);

        if (res.ok) {
          response.value = res.data.choices[0].text;
        } else {
          console.error("Error:", res.error);
        }
      } catch (err) {
        console.error(err);
      }
    }

    function clear() {
      state.input1 = "";
      state.input2 = "";
      state.signature = "";
      state.references = "";
      state.body = "";
      state.header = "";
    }

    function copyToClipboard() {
      const text = `${this.header}\n\n${this.body}\n\n${this.signature}\n\n${this.references}`;

      try {
        navigator.clipboard.writeText(text);
      } catch (error) {
        console.error("Failed to copy text: ", error);
      }
    }

    return {
      ...toRefs(state),
      copyToClipboard,
      clear,
      fetchGpt3Response,
    };
  },
};
</script>

<style lang="scss" scoped></style>
