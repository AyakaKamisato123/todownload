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
            <q-item-label class="text-capitalize">{{
              productName
            }}</q-item-label>
            <q-item-label caption lines="2">{{ category }}</q-item-label>
          </div>
        </div>
      </q-item-section>
      <q-item-section side top>
        <q-item-label caption>PHP {{ price }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator></q-separator>
  </q-list>
</template>
<script setup>
const props = defineProps({
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: [Number, String],
    required: true,
  },
});
</script>
