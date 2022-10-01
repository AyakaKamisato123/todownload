<template>
  <q-list>
    <q-item class="q-px-none q-gutter-sm">
      <img
        src="https://via.placeholder.com/150"
        alt=""
        height="50"
        width="50"
      />
      <q-item-section>
        <div class="row">
          <div>
            <q-item-label class="text-capitalize">
              {{ productName }}
            </q-item-label>
            <q-item-label caption lines="2">
              <q-chip
                v-for="categ in mappedCategory.slice(0, 1)"
                :key="categ.id"
                color="grey-7"
                text-color="white"
                size="sm"
              >
                {{ categ.category }}
              </q-chip>
              <q-chip size="sm">
                +{{ mappedCategory.length - 1 }} Categories
              </q-chip>
            </q-item-label>
          </div>
        </div>
      </q-item-section>
      <q-item-section side top>
        <q-item-label caption>PHP {{ price }}</q-item-label>
        <q-item-label caption>QTY: {{ qty }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator></q-separator>
  </q-list>
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
