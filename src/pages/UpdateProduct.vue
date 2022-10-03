<template>
  <q-page class="q-pa-md md:q-pa-sm">
    <div>
      <div class="text-weight-bold text-h6">Product Info</div>
      <div class="text-grey">Update your product information</div>
    </div>
    <q-form ref="form" @submit="updateProduct">
      <div class="q-gutter-sm">
        <q-input
          v-model="productData.name"
          label="Product Label"
          :rules="fieldRequired"
        />
        <q-select
          v-model="productData.categories"
          :options="productCategories"
          label="Category"
          option-value="id"
          option-label="category"
          :rule="fieldRequired"
          emit-value
          map-options
          multiple
          use-chips
          clearable
          virtual-scroll-slice-size="5"
        />
        <q-input
          v-model="productData.description"
          label="Description"
          :rules="fieldRequired"
        />
        <q-input
          v-model="productData.unit"
          label="Unit of Measurement"
          :rules="fieldRequired"
        />
        <div class="row q-gutter-sm q-mx-none">
          <div class="col">
            <q-input
              v-model="productData.price"
              type="number"
              label="Price"
              :rules="fieldRequired"
            />
          </div>
          <div class="col">
            <q-input
              v-model="productData.stocks"
              type="number"
              label="Stocks"
              :rules="fieldRequired"
            />
          </div>
        </div>
        <div class="row q-gutter-sm q-mx-none">
          <div class="col">
            <q-input
              v-model="productData.cost"
              type="number"
              label="Product Cost"
              :rules="fieldRequired"
            />
          </div>
          <div class="col">
            <q-input
              v-model="productData.lowLevelStock"
              type="number"
              label="Low Level"
              :rules="fieldRequired"
            />
          </div>
        </div>
      </div>
      <!-- <div class="q-mt-md">
        <div>
          <p class="text-h6">Product Variants</p>
          <p class="text-weight-regular text-caption">
            Manage the product variant
          </p>
        </div>
        <div class="row justify-end q-mt-sm">
          <q-btn
            unelevated
            color="primary"
            @click.prevent="
              variantModal.shown = true;
              variantModal.type = 'add';
            "
            >Add Variant</q-btn
          >
        </div>
        <div class="q-mt-md">
          <product-variant
            v-for="(product, i) in productData.variants"
            :id="i"
            :key="product.type"
            :name="product.type"
            :category="product.category"
            :price="product.price"
            :qty="product.qty"
            @swiped-right="removeVariant"
            @swiped-left="editVariant"
          />
          <p v-if="productData.variants.length == 0">
            No product variant added
          </p>
        </div>
      </div> -->
      <div class="row justify-end q-gutter-sm">
        <q-btn
          unelevated
          color="red"
          class="q-mt-lg"
          style="width: 100%; display: block"
          @click.prevent="showDeleteModal = true"
          >Delete Product</q-btn
        >
        <q-btn
          type="submit"
          unelevated
          color="primary"
          style="width: 100%; display: block"
          >Update Product</q-btn
        >
      </div>
    </q-form>
    <!--
    <q-dialog v-model="variantModal.shown" position="bottom">
      <q-card style="width: 100%">
        <q-card-section class="column no-wrap">
          <div>
            <div class="text-weight-bold text-h6">Product Variant</div>
            <div class="text-grey">Please fill-in all the fields</div>
          </div>
          <div>
            <q-input
              v-model="variant.type"
              label="Variant Type"
              :rules="fieldRequired"
            />
          </div>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input
                v-model="variant.price"
                type="number"
                label="Price"
                :rules="fieldRequired"
              />
            </div>
            <div class="col">
              <q-input
                v-model="variant.cost"
                type="number"
                label="Cost"
                :rules="fieldRequired"
              />
            </div>
            <div class="col">
              <q-input
                v-model="variant.qty"
                type="number"
                label="Stocks"
                :rules="fieldRequired"
              />
            </div>
          </div>
          <q-btn
            unelevated
            class="q-my-md"
            color="primary"
            style="width: 100%; display: block"
            @click.prevent="saveVariant"
            >Save Variant</q-btn
          >
        </q-card-section>
      </q-card>
    </q-dialog> -->

    <q-dialog v-model="showDeleteModal" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <p class="q-ml-sm text-h6 q-mb-sm">Delete Product</p>
          <span class="q-ml-sm"
            >This will remove the product in your inventory.
            <span class="text-red"
              >Are you sure you want to proceed?</span
            ></span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="Cancel"
            color="primary"
            :disable="isBtnLoading"
          />
          <q-btn
            flat
            label="Proceed"
            color="red"
            :loading="isBtnLoading"
            @click.prevent="deleteProduct"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
// import ProductVariant from "src/components/ProductVariant.vue";
import { fieldRequired } from "../helpers/fieldRules";
import { useProduct } from "../composable/products";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import { productCategories } from "src/helpers/categories";

// const variantModal = ref({ shown: false, type: "add", editId: null });
const $q = useQuasar();

const router = useRouter();
const route = useRoute();

const products = useProduct();
const form = ref(null);

let productId = ref(null);
let indexOf = ref(null);
let isBtnLoading = ref(false);

let showDeleteModal = ref(false);

onMounted(() => {
  productId.value = route.params.id;
  const prodUpdate = products.value.filter(
    (prod) => prod.id == productId.value
  )[0];

  if (prodUpdate === undefined) return router.push("/inventory");
  Object.assign(productData, prodUpdate);

  products.value.map((prod, i) => {
    if (prod.id == productId.value) {
      indexOf.value = i;
    }
  });
});

const initialState = {
  name: "",
  category: "",
  description: "",
  unit: "",
  price: "",
  stocks: "",
  cost: "",
  lowLevelStock: "",
  variants: [],
};

// const variantInitialState = { type: "", price: "", cost: "", qty: 0 };

const productData = reactive({ ...initialState });
// const variant = reactive({ ...variantInitialState });

// const resetVariantForm = () => {
//   Object.assign(variant, variantInitialState);
// };

// const saveVariant = () => {
//   if (variantModal.value.type === "add") {
//     productData.variants.unshift({
//       ...variant,
//     });
//   }

//   if (variantModal.value.type === "update") {
//     productData.variants[variantModal.value.editId] = { ...variant };
//   }

//   resetVariantForm();
//   variantModal.value.shown = false;
// };

// const editVariant = (id) => {
//   Object.assign(variant, productData.variants[id]);
//   variantModal.value.shown = true;
//   variantModal.value.type = "update";
//   variantModal.value.editId = id;
// };

// const removeVariant = (index) => {
//   productData.variants.splice(index, 1);
//   $q.notify({
//     position: "bottom",
//     color: "green",
//     icon: "done_all",
//     message: "Product variant has been removed!",
//   });
// };

const updateProduct = () => {
  products.value.map((prod, i) => {
    if (prod.id == productId.value) {
      products.value[i] = {
        ...productData,
        updatedAt: Date.now(),
      };
    }
  });

  $q.notify({
    position: "top",
    color: "green",
    icon: "done_all",
    message: "Product updated successfully!",
  });

  router.go(-1);
};

const deleteProduct = () => {
  isBtnLoading.value = true;
  products.value.splice(indexOf.value, 1);

  setTimeout(() => {
    isBtnLoading.value = false;

    $q.notify({
      position: "bottom",
      color: "green",
      icon: "done_all",
      message: "Product deleted successfully!",
    });

    router.go(-1);
  }, 1000);
};
</script>
