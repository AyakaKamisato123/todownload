<template>
  <q-page class="q-pa-md md:q-pa-sm">
    <div>
      <div class="text-weight-bold text-h6">Product Info</div>
      <div class="text-grey">Enter your product information</div>
    </div>
    <q-form ref="form" @submit="saveProduct">
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
              type="number"
              v-model="productData.price"
              label="Price"
              :rules="fieldRequired"
            />
          </div>
          <div class="col">
            <q-input
              type="number"
              v-model="productData.stocks"
              label="Stocks"
              :rules="fieldRequired"
            />
          </div>
        </div>
        <div class="row q-gutter-sm q-mx-none">
          <div class="col">
            <q-input
              type="number"
              v-model="productData.cost"
              label="Product Cost"
              :rules="fieldRequired"
            />
          </div>
          <div class="col">
            <q-input
              type="number"
              v-model="productData.lowLevelStock"
              label="Low Level"
              :rules="fieldRequired"
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
            :key="product.type"
            :id="i"
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
      </div>
      <div class="row justify-end">
        <q-btn
          type="submit"
          unelevated
          color="primary"
          class="q-mt-lg"
          style="width: 100%; display: block"
          >Save Product</q-btn
        >
      </div>
    </q-form>

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
                type="number"
                v-model="variant.price"
                label="Price"
                :rules="fieldRequired"
              />
            </div>
            <div class="col">
              <q-input
                type="number"
                v-model="variant.cost"
                label="Cost"
                :rules="fieldRequired"
              />
            </div>
            <div class="col">
              <q-input
                type="number"
                v-model="variant.qty"
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
    </q-dialog>
  </q-page>
</template>
<script setup>
import { reactive, ref } from "vue";
import ProductVariant from "src/components/ProductVariant.vue";
import { fieldRequired } from "../helpers/fieldRules";
import { useProduct } from "../composable/products";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { productCategories } from "src/helpers/categories";

const variantModal = ref({ shown: false, type: "add", editId: null });
const $q = useQuasar();
const router = useRouter();

const products = useProduct();
const form = ref(null);

const initialState = {
  name: "",
  category: "",
  description: "",
  unit: "",
  price: "",
  stocks: "",
  cost: "",
  lowLevelStock: "",
  variants: [
    { type: "Black", price: 12500, cost: 10000, qty: 100 },
    { type: "Orange", price: 12500, cost: 10000, qty: 150 },
  ],
};

const variantInitialState = { type: "", price: "", cost: "", qty: 0 };

const productData = reactive({ ...initialState });
const variant = reactive({ ...variantInitialState });

/** Reset Form Solution */
const resetForm = () => {
  form.value.resetValidation();
  Object.assign(productData, initialState);
};

const resetVariantForm = () => {
  Object.assign(variant, variantInitialState);
};

const saveVariant = () => {
  if (variantModal.value.type === "add") {
    productData.variants.unshift({
      ...variant,
    });
  }

  if (variantModal.value.type === "update") {
    productData.variants[variantModal.value.editId] = { ...variant };
  }

  resetVariantForm();
  variantModal.value.shown = false;
};

const editVariant = (id) => {
  Object.assign(variant, productData.variants[id]);
  variantModal.value.shown = true;
  variantModal.value.type = "update";
  variantModal.value.editId = id;
};

const removeVariant = (index) => {
  console.log("Received Index: ", index);
  productData.variants.splice(index, 1);
  $q.notify({
    position: "top",
    color: "green",
    icon: "done_all",
    message: "Product variant has been removed!",
  });
};

const saveProduct = () => {
  products.value.unshift({
    ...productData,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  $q.notify({
    position: "top",
    color: "green",
    icon: "done_all",
    message: "Product added successfully!",
  });

  router.push("/");
};
</script>
