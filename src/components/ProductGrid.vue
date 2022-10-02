<template>
  <div class="relative-position">
    <router-link :to="`/update-product/${id}`">
      <img src="https://via.placeholder.com/240" alt="" class="img-fluid" />
      <div class="img-description">
        <span>{{ productName }}</span
        ><br />
        <span>{{ price }}</span>
      </div>
    </router-link>
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
});
</script>
