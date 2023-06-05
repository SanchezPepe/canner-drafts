<template>
  <label for="header" class="font-bold"> {{ props.label }} </label>
  <textarea
    v-if="props.rows !== 0"
    v-model="state.input"
    id="header"
    :rows="props.rows"
    class="w-full p-4 rounded-xl mt-2 text-sm text-white bg-gray-900 border-1 border-gray-500 focus:ring-0"
    placrequired
  ></textarea>
  <textarea
    v-else
    v-model="state.input"
    id="header"
    :rows="props.rows"
    class="w-full h-[90%] p-4 rounded-xl mt-2 text-sm text-white bg-gray-900 border-1 border-gray-500 focus:ring-0"
    placrequired
  ></textarea>
</template>

<script setup lang="ts">
const emit = defineEmits(["emit-data"]);
const props = defineProps({
  label: String,
  text: String,
  rows: Number,
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
