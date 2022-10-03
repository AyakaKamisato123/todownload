<template>
  <q-layout view="lHh Lpr lFf">
    <q-footer bordered class="bg-white text-primary">
      <q-tabs
        no-caps
        dense
        active-color="primary"
        indicator-color="primary"
        class="text-grey"
      >
        <q-route-tab
          name="dashboard"
          label="Dashboard"
          icon="dashboard"
          :to="{ name: appRoute.DASHBOARD }"
        />
        <q-route-tab
          name="inventory"
          label="Inventory"
          icon="inventory_2"
          :to="{ name: appRoute.PRODUCT_INVENTORY }"
        />
        <q-route-tab
          name="sales"
          label="Sales"
          icon="area_chart"
          :to="{ name: appRoute.SALES_HISTORY }"
        />
        <q-route-tab
          name="settings"
          label="Settings"
          icon="settings"
          to="/settings"
        />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { appRoute } from "src/router/constants";
</script>
<style>
.q-tab__icon {
  font-size: 20px !important;
}
</style>
