<template>
  <q-page class="q-pa-md md:q-pa-sm">
    <div class="q-gutter-sm">
      <q-input v-model="productData.label" label="Product Label" />
      <q-input v-model="productData.category" label="Category" />
      <q-input v-model="productData.description" label="Description" />
      <q-input v-model="productData.unit" label="Unit of Measurement" />
      <div class="row q-gutter-sm q-mx-none">
        <div class="col">
          <q-input type="number" v-model="productData.price" label="Price" />
        </div>
        <div class="col">
          <q-input type="number" v-model="productData.stocks" label="Stocks" />
        </div>
      </div>
      <div class="row q-gutter-sm q-mx-none">
        <div class="col">
          <q-input type="number" v-model="productData.cost" label="Cost" />
        </div>
        <div class="col">
          <q-input
            type="number"
            v-model="productData.lowLevelStock"
            label="Low Level"
          />
        </div>
      </div>
    </div>
    <div class="q-mt-md">
      <div>
        <p class="text-h6">Product Variants</p>
        <p class="text-weight-regular text-caption">
          Manage the product variant
        </p>
      </div>
      <div class="row justify-end q-mt-sm">
        <q-btn unelevated color="primary">Add Variant</q-btn>
      </div>
      <div class="q-mt-md">
        <product-variant
          v-for="product in productCards"
          :key="product.id"
          :id="product.id"
          :name="product.productName"
          :category="product.category"
          :price="product.price"
          :qty="product.qty"
        />
      </div>
    </div>
    <q-btn
      style="display: block; width: 100%"
      unelevated
      class="q-mt-md"
      color="primary"
      >Save Product</q-btn
    >
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import ProductVariant from "src/components/ProductVariant.vue";
import { productCards } from "src/constants/products";
const productData = ref({
  label: "",
  category: "",
  description: "",
  unit: "",
  price: "",
  stocks: "",
  cost: "",
  lowLevelStock: "",
  variants: [],
});
</script>
