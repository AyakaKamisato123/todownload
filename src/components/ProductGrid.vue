<template>
  <div class="relative-position">
    <img src="https://via.placeholder.com/240" alt="" class="img-fluid" />
    <div class="img-description">
      <span>{{ productName }}</span
      ><br />
      <span>{{ price }}</span>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { productCategories } from "src/helpers/categories";
const mappedCategory = ref([]);

const props = defineProps({
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

onMounted(() => {
  mappedCategory.value = productCategories.filter((categ) =>
    props.category.includes(categ.id)
  );
});
</script>
