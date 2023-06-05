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
      <div class="border border-gray-500 rounded-lg bg-gray-800 text-white p-4">
        <!-- Case notes -->
        <TextArea
          @emitData="(data) => (notes = data)"
          label="Case notes"
          :rows="0"
          :text="notes"
        ></TextArea>
      </div>

      <div>
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
      url: "https://example.com",
      input: "",
      signature: "",
      references: "",
      body: "",
      notes: "",
      header: "Hello team,",
    });

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
    };
  },
};
</script>

<style lang="scss" scoped></style>
