<template>
  <q-page class="q-pa-md md:q-pa-sm">
    <div ref="summary">
      <div>
        <p class="text-h6">Hello, John Doe!</p>
        <p class="text-weight-regular text-subtitle1">
          Welcome, Here is your store summary.
        </p>
      </div>
      <div class="row q-mt-md">
        <div class="col-12">
          <q-card flat class="shadow-2 bg-primary text-white q-px-sm">
            <q-card-section horizontal class="items-center row justify-between">
              <q-card-section>
                <p class="text-caption">Today's Sales</p>
                <p class="text-h3 q-pt-sm">12,500</p>
              </q-card-section>
              <q-card-section>
                <q-icon name="payments" size="72px" />
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-gutter-sm" style="margin-top: 0px">
        <div class="col">
          <q-card flat class="shadow-2 bg-grey-10 text-white q-px-sm">
            <q-card-section horizontal class="items-center row justify-between">
              <q-card-section>
                <p class="text-h4">100</p>
                <p class="text-caption">Total Products</p>
              </q-card-section>
              <q-card-section>
                <q-icon name="inventory_2" size="48px" />
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card flat class="shadow-2 bg-red-7 text-white q-px-sm">
            <q-card-section horizontal class="items-center row justify-between">
              <q-card-section>
                <p class="text-h4">240</p>
                <p class="text-caption">Low Stocks</p>
              </q-card-section>
              <q-card-section>
                <q-icon name="error" size="48px" />
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-mt-sm">
        <div class="col-12">
          <q-card flat class="shadow-2 bg-purple-7 text-white q-px-sm">
            <q-card-section horizontal class="items-center row justify-between">
              <q-card-section class="q-pa-md row">
                <div class="q-ml-lg">
                  <q-icon name="point_of_sales" size="48px" />
                </div>
                <div class="col">
                  <p class="text-h6">Point of Sales</p>
                  <p class="text-caption">Sales and payments</p>
                </div>
              </q-card-section>
              <q-btn
                icon="arrow_forward"
                unelevated
                :to="{ name: 'Point of Sales' }"
                rounded
              ></q-btn>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div class="q-mt-md">
      <div>
        <p class="text-h6">Recent Products</p>
        <p class="text-weight-regular text-subtitle1">
          Here are your recently added products
        </p>
      </div>
      <div
        ref="scrollableTransaction"
        class="q-mt-sm"
        v-if="products.length > 0"
      >
        <q-scroll-area :style="`height: ${containerHeight}px`">
          <product-list
            v-for="product in products"
            :key="product.productName"
            :productName="product.name"
            :category="product.category"
            :price="formatCurrency(product.price)"
          />
        </q-scroll-area>
      </div>
      <p v-else class="q-mt-md text-subtitle1 text-grey-6">
        No products available. You may add your product by clicking the plus
        icon
      </p>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="blue" :to="{ name: appRoute.ADD_PRODUCT }" />
    </q-page-sticky>
  </q-page>
</template>
<script setup>
import ProductList from "src/components/ProductList.vue";
import { appRoute } from "src/router/constants";
import { ref, onMounted } from "vue";
import { productCards } from "src/helpers/products";
import { useProduct } from "src/composable/products";
import { formatCurrency } from "../helpers/utilities";

import { dom } from "quasar";
const { offset, height } = dom;

const products = useProduct();
const scrollableTransaction = ref("");

/** Element Refs */
const containerHeight = ref(200);
const summary = ref(200);

const NAV_HEIGHT = 72;
const OFFSET_HEIGHT = 70;
const RECENT_HEADING_HEIGHT = 32 + 16; //Heading and subheading

onMounted(() => {
  containerHeight.value =
    height(window) -
    (height(summary.value) +
      NAV_HEIGHT +
      RECENT_HEADING_HEIGHT +
      OFFSET_HEIGHT);

  // console.log(
  //   `Summary Height: ${height(summary.value)}, Scrollable Transaction: ${
  //     containerHeight.value
  //   }`
  // );

  // console.log(`Dom Height: ${height(window)}`);
});
</script>
