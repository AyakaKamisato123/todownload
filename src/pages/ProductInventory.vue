<template>
  <q-page class="q-pa-md md:q-pa-sm">
    <div ref="inventory">
      <div>
        <p class="text-h6">Inventory Management</p>
        <p class="text-weight-regular text-subtitle1">
          Manage your categories and products
        </p>
      </div>
      <q-input v-model="filter" label="Search Product" class="q-mb-md" />
      <q-scroll-area style="height: 50px; width: 100%">
        <div class="row no-wrap">
          <q-chip
            v-for="categ in productCategories"
            :key="categ.id"
            v-model:selected="selectedCategory"
            color="grey-6"
            text-color="white"
          >
            {{ categ.category }}
          </q-chip>
        </div>
      </q-scroll-area>

      <div class="q-mt-sm"></div>
      <q-scroll-area :style="`height: ${containerHeight}px`">
        <div class="row">
          <div
            v-for="product in filteredData"
            :key="product.productName"
            class="col-6"
          >
            <product-grid
              :id="product.id"
              :product-name="product.name"
              :category="product.categories"
              :price="formatCurrency(product.price)"
              :qty="product.stocks"
            />
          </div>
        </div>
      </q-scroll-area>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="blue" :to="{ name: appRoute.ADD_PRODUCT }" />
    </q-page-sticky>
  </q-page>
</template>
<script setup>
import { appRoute } from "src/router/constants";
import { productCategories } from "src/helpers/categories";
import ProductGrid from "src/components/ProductGrid.vue";
import { useProduct } from "src/composable/products";
import { ref, onMounted, computed } from "vue";
import { formatCurrency } from "../helpers/utilities";

import { dom } from "quasar";
const { height } = dom;

const filter = ref("");
const products = useProduct();

const selectedCategory = ref(false);
/** Element Refs */
const containerHeight = ref(200);

const OFFSET_HEIGHT = 55;
const TOP_EL_HEIGHT = 32 + 28 + 56 + 20 + 36; //Heading and subheading
const BOTTOM_NAV = 72;
onMounted(() => {
  containerHeight.value =
    height(window) - (TOP_EL_HEIGHT + OFFSET_HEIGHT + BOTTOM_NAV);
});

const filteredData = computed(() => {
  return filter.value.trim() !== ""
    ? products.value.filter((data) => {
        return data.name.toLowerCase().indexOf(filter.value.toLowerCase()) > -1;
      })
    : products.value;
});
</script>
