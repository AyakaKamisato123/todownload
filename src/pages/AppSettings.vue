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
      <q-input
        v-model="data.storeName"
        outlined
        label="Store Name"
        :rule="fieldRequired"
      />
      <q-input
        v-model="data.address"
        outlined
        label="Store Address"
        :rule="fieldRequired"
      />
      <q-input
        v-model="data.storeContact"
        outlined
        label="Business Number"
        :rule="fieldRequired"
      />
      <div class="q-gutter-sm row q-mx-none q-mt-none">
        <div class="col">
          <q-input
            v-model="data.openingHour"
            outlined
            mask="time"
            :rules="['time']"
            label="Opening"
          >
            <template #append>
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
            v-model="data.closingHour"
            outlined
            mask="time"
            :rules="['time']"
            label="Closing"
          >
            <template #append>
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
      <q-input v-model="data.owner" outlined label="Full Name" />
      <q-input v-model="data.ownerContact" outlined label="Contact Number" />
      <q-input v-model="data.ownerEmail" outlined label="Email Address" />
      <q-select
        v-model="data.ownerGender"
        :options="['Male', 'Female', 'Others']"
        outlined
        label="Gender"
        :rule="fieldRequired"
        clearable
      />
    </div>
    <div class="row justify-end q-mt-sm q-gutter-sm">
      <q-btn
        unelevated
        color="primary"
        @click.prevent="resetModalShown = true"
        :disable="isBtnLoading"
        >Reset Data</q-btn
      >
      <q-btn
        unelevated
        color="primary"
        :loading="isBtnLoading"
        @click.prevent="saveSettings"
        >Update Data</q-btn
      >
    </div>

    <q-dialog v-model="resetModalShown" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <p class="q-ml-sm text-h6 q-mb-sm">Reset Data</p>
          <span class="q-ml-sm"
            >This will reset everything including products and user data.
            <span class="text-red"
              >Are you sure you want to proceed?</span
            ></span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            v-close-popup
            color="primary"
            :disable="isBtnLoading"
          />
          <q-btn
            flat
            label="Proceed"
            color="red"
            @click.prevent="resetData"
            :loading="isBtnLoading"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import { reactive, onMounted, ref } from "vue";
import { useAppSettings } from "src/composable/app-settings";
import { fieldRequired } from "src/helpers/fieldRules";
import { useQuasar } from "quasar";

const resetModalShown = ref(false);
const isBtnLoading = ref(false);
const appSettings = useAppSettings();
const $q = useQuasar();

const data = reactive({
  storeName: "",
  address: "",
  storeContact: "",
  owner: "",
  ownerEmail: "",
  ownerContact: "",
  ownerGender: "",
});

onMounted(() => {
  Object.assign(data, appSettings.value);
});

const saveSettings = () => {
  isBtnLoading.value = true;
  appSettings.value = { ...data };

  setTimeout(() => {
    isBtnLoading.value = false;
    $q.notify({
      position: "bottom",
      color: "green",
      icon: "done_all",
      message: "Settings saved successfully!",
    });
  }, 1000);
};

const resetData = () => {
  isBtnLoading.value = true;
  localStorage.removeItem("products");
  localStorage.removeItem("app-settings");
  localStorage.removeItem("transactions");
  setTimeout(() => {
    isBtnLoading.value = false;
    resetModalShown.value = false;
  }, 1500);
};
</script>
