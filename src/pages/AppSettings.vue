<template>
  <q-page class="q-pa-md md:q-pa-sm">
    <div>
      <p class="text-h6">Business Info</p>
      <p class="text-weight-regular text-caption">
        Set your business information
      </p>
    </div>
    <q-separator class="q-mt-md" />

    <div class="q-gutter-sm q-mt-md">
      <q-input outlined v-model="data.storeName" label="Store Name" />
      <q-input outlined v-model="data.address" label="Store Address" />
      <q-input outlined v-model="data.storeContact" label="Business Number" />
      <div class="q-gutter-sm row q-mx-none q-mt-none">
        <div class="col">
          <q-input
            outlined
            v-model="data.openingHour"
            mask="time"
            :rules="['time']"
            label="Opening"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="data.openingHour">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col">
          <q-input
            outlined
            v-model="data.closingHour"
            mask="time"
            :rules="['time']"
            label="Closing"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="data.closingHour">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </div>

    <div class="q-mt-sm">
      <p class="text-h6">Store Owner</p>
      <p class="text-weight-regular text-caption">Store owner information</p>
    </div>

    <q-separator class="q-mt-md" />

    <div class="q-gutter-sm q-mt-md">
      <q-input outlined v-model="data.owner" label="Full Name" />
      <q-input outlined v-model="data.ownerContact" label="Contact Number" />
      <q-input outlined v-model="data.ownerEmail" label="Email Address" />
    </div>
    <div class="row justify-end q-mt-md">
      <q-btn unelevated color="primary">Update Data</q-btn>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
const data = ref({
  storeName: "",
  address: "",
  storeContact: "",
  owner: "",
  ownerEmail: "",
  ownerContact: "",
});
</script>
