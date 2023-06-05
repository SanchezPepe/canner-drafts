<template>
  <label for="header" class="font-bold"> {{ props.label }} </label>
  <textarea
    v-model="state.input"
    id="header"
    :disabled="props.disabled"
    :rows="props.rows"
    :class="props.rows === 0 ? 'h-[90%]' : ''"
    class="w-full p-4 rounded-xl mt-2 text-sm text-white bg-gray-900 border-1 border-gray-500 focus:ring-0"
  ></textarea>
</template>

<script setup lang="ts">
const emit = defineEmits(["emit-data"]);
const props = defineProps({
  label: String,
  text: String,
  rows: Number,
  disabled: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  input: props.text,
});

watch(
  () => state.input,
  (newValue) => {
    emit("emit-data", newValue);
  }
);
</script>

<style lang="scss" scoped></style>
