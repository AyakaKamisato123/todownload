<template>
  <q-slide-item @left="swipedLeft" @right="swipedRight" right-color="red">
    <template v-slot:left>
      <q-icon name="edit" />
    </template>
    <template v-slot:right>
      <q-icon name="delete" />
    </template>

    <q-item class="q-mx-none q-px-none row">
      <q-item-section class="row">
        <p class="text-subtitle1">{{ name }}</p>
        <p class="text-grey-7">{{ category }}</p>
      </q-item-section>
      <q-item-section side top>
        <p class="text-subtitle1">PHP {{ price }}</p>
        <p class="text-grey-7">QTY: {{ qty }}</p>
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>
<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  qty: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["swipedRight", "swipedLeft"]);

const swipedRight = (id) => {
  emit("swipedRight", id);
};

const swipedLeft = (id) => {
  emit("swipedLeft", id);
};
</script>
