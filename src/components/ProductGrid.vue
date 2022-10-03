<template>
  <div class="relative-position rounded-borders q-mr-sm">
    <img
      src="../assets/images/img-placeholder.png"
      alt=""
      class="img-fluid rounded-borders"
    />
    <div class="img-description">
      <span>{{ productName }}</span
      ><br />
      <div class="row justify-between">
        <span>{{ price }}</span>
        <span>QTY: {{ qty }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: [String, Array],
    required: true,
  },
  price: {
    type: [Number, String],
    required: true,
  },
  qty: {
    type: [Number, String],
    required: true,
  },
  // productVariants: {
  //   type: [String, Number],
  // },
});
</script>
