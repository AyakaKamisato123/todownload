<template>
  <div>
    <p>Im the Inventory Section</p>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="blue" :to="{ name: appRoute.ADD_PRODUCT }" />
    </q-page-sticky>
  </div>
</template>
<script setup>
import { appRoute } from "src/router/constants";
</script>
