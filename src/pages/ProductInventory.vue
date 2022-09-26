<template>
  <q-page class="q-pa-md md:q-pa-sm">
    <div ref="summary">
      <div>
        <p class="text-h6">Inventory Management</p>
        <p class="text-weight-regular text-subtitle1">
          Manage your categories and products
        </p>
      </div>
      <q-input v-model="filter" label="Search Product" :rules="fieldRequired" />
      <q-scroll-area style="height: 50px; width: 100%">
        <div class="row no-wrap">
          <q-chip
            v-for="categ in productCategories"
            :key="categ.id"
            color="grey-7"
            text-color="white"
          >
            {{ categ.category }}
          </q-chip>
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
import { fieldRequired } from "src/helpers/fieldRules";
import { productCategories } from "src/helpers/categories";
import { ref } from "vue";

const filter = ref("");
</script>
