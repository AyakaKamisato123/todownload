<template>
  <q-page class="q-pa-md md:q-pa-sm">
    <div ref="cartitems" class="q-pb-fragment">
      <div class="row justify-between q-mt-sm">
        <p class="text-weight-bold">Transaction #:</p>
        <p>{{ padNumber(transactions.length) }}</p>
      </div>
      <div class="row justify-between">
        <p class="text-weight-bold">Date:</p>
        <p>{{ currentDate }}</p>
      </div>

      <hr class="q-mt-lg q-mb-md" />

      <div class="q-mt-md">
        <q-table
          class="sticky-price-table"
          hide-bottom
          flat
          title=""
          :columns="columns"
          :rows="cart"
          row-key="name"
        />
      </div>
      <div class="row">
        <div class="col-5"></div>
        <div class="col-7">
          <div class="row justify-between">
            <p class="text-right q-mt-sm q-mr-sm text-weight-bold">
              Delivery Fee: &nbsp;
            </p>
            <p class="text-right q-mt-sm q-mr-sm">
              {{ formatCurrency(transactionData.deliveryFee) }}
            </p>
          </div>
          <div class="row justify-between">
            <p class="text-right q-mt-sm q-mr-sm text-weight-bold">
              Sub Total: &nbsp;
            </p>
            <p class="text-right q-mt-sm q-mr-sm">
              {{ formatCurrency(subTotal) }}
            </p>
          </div>
          <div class="row justify-between">
            <p class="text-right q-mt-sm q-mr-sm text-weight-bold">
              Grand Total: &nbsp;
            </p>
            <p class="text-right q-mt-sm q-mr-sm">
              {{ formatCurrency(grandTotal) }}
            </p>
          </div>
        </div>
      </div>

      <hr class="q-mt-lg q-mb-md" />

      <div>
        <p class="text-weight-bold text-h6">Cart Options</p>
        <p>Here are some other options you can do</p>
        <div class="row q-mt-sm no-wrap">
          <div class="col-4">
            <div
              class="column bg-primary text-white justify-center items-center q-pa-md rounded-borders q-mr-sm"
              @click="router.push('/point-of-sales/products')"
            >
              <q-icon size="18px" name="add_shopping_cart" />
              <p class="q-mt-sm">Add Item</p>
            </div>
          </div>
          <!-- <div class="col-4">
            <div
              class="column bg-primary text-white justify-center items-center q-pa-md rounded-borders q-mr-sm"
            >
              <q-icon size="18px" name="loyalty" />
              <p class="q-mt-sm">Discount</p>
            </div>
          </div> -->
          <div class="col-4">
            <div
              class="column bg-primary text-white justify-center items-center q-pa-md rounded-borders q-mr-sm"
              @click="deliveryFeeModal = true"
            >
              <q-icon size="18px" name="local_shipping" />
              <p class="q-mt-sm">Delivery</p>
            </div>
          </div>
        </div>
      </div>

      <hr class="q-mt-lg q-mb-md" />

      <div class="q-pb-md q-pt-sm">
        <p class="text-weight-bold text-h6">
          Customer Details <span class="text-caption">(Optional)</span>
        </p>
        <p>Here are some other options you can do</p>
        <div class="q-mt-md">
          <q-input v-model="transactionData.name" label="Full Name"></q-input>
          <q-input
            v-model="transactionData.contact_number"
            label="Contact Number"
          ></q-input>
          <q-input v-model="transactionData.address" label="Address"></q-input>
        </div>
      </div>

      <hr class="q-mt-lg q-mb-lg" />

      <div>
        <p class="text-weight-bold text-h6">
          Transaction Notes <span class="text-caption">(Optional)</span>
        </p>
        <p>Add some notes if necessary</p>
        <div>
          <q-input
            v-model="transactionData.notes"
            type="textarea"
            auto-grow
            label="Transaction Notes"
          ></q-input>
        </div>
      </div>
    </div>

    <q-dialog
      v-model="checkoutModal"
      position="bottom"
      class=""
      @hide="summary = true"
    >
      <q-card class="full-width fragment-radius">
        <q-linear-progress :value="1" color="blue" />
        <q-card-section class="">
          <div class="text-caption">
            <div class="text-weight-bold text-h6">Amount Payable</div>
            <div class="">Enter the amount tendered by the user</div>
          </div>
          <div class="row justify-between q-mt-md">
            <p class="text-weight-bold">Total Amount</p>
            <p>{{ formatCurrency(grandTotal) }}</p>
          </div>
          <div>
            <q-form ref="checkoutForm">
              <q-input
                v-model="transactionData.amountReceived"
                label="Amount Received"
                :rules="amountReceived"
              />
            </q-form>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="q-mb-sm q-mt-md">
          <q-btn flat label="Close" color="gray" :disable="isBtnLoading" />
          <q-btn
            flat
            label="Checkout"
            color="primary"
            :disable="isBtnLoading || checkoutBtnDisabled"
            @click="checkoutTransaction"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="summary" seamless position="bottom" class="">
      <q-card
        class="full-width fragment-radius"
        @click.prevent="
          summary = false;
          checkoutModal = true;
        "
      >
        <q-linear-progress :value="0.8" color="blue" />
        <q-card-section class="row items-center no-wrap q-pt-sm q-pb-md">
          <div class="text-caption">
            <div class="text-weight-bold text-h6">Proceed Checkout</div>
            <div class="">Grand Total: {{ formatCurrency(grandTotal) }}</div>
          </div>
          <q-space />
          <q-btn flat round icon="arrow_forward" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deliveryFeeModal" class="">
      <q-card class="full-width fragment-radius">
        <q-card-section class="q-pt-sm q-pb-md">
          <div class="text-caption">
            <div class="text-weight-bold text-h6">Delivery</div>
            <div class="">
              Please set the price and delivery address for the customer
            </div>
            <div class="q-mt-md">
              <q-input
                v-model="transactionData.deliveryFee"
                label="Delivery Fee"
                autogrow
              ></q-input>
              <q-input
                v-model="transactionData.deliveryAddress"
                type="textarea"
                label="Delivery Address"
                :rules="fieldRequired"
                autogrow
              ></q-input>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="q-mb-sm q-mt-md">
          <q-btn
            flat
            label="Close"
            color="primary"
            :disable="isBtnLoading"
            @click="deliveryFeeModal = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import { ref, computed, reactive } from "vue";
import { formatCurrency } from "../helpers/utilities";
import { useCart } from "src/composable/cart";
import { useTransactions } from "src/composable/transactions";
import { useProduct } from "src/composable/products";
import { fieldRequired } from "src/helpers/fieldRules";
import moment from "moment";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const router = useRouter();

const transactionData = reactive({
  name: "",
  contact_number: "",
  address: "",
  notes: "",
  deliveryFee: 0,
  deliveryAddress: "",
  amountReceived: 0,
});

const $q = useQuasar();
const deliveryFeeModal = ref(false);
const checkoutModal = ref(false);
const summary = ref(true);
const isBtnLoading = ref(false);
const checkoutBtnDisabled = ref(false);
const checkoutForm = ref("");

const columns = [
  {
    name: "id",
    label: "ID",
    align: "left",
    field: (row) => row.id,
    sortable: true,
  },
  {
    name: "name",
    label: "PRODUCT",
    align: "left",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "price",
    label: "PRICE",
    align: "left",
    field: (row) => formatCurrency(row.price),
    sortable: true,
  },
  {
    name: "qty",
    label: "QTY",
    align: "left",
    field: (row) => row.qty,
    sortable: true,
  },
  {
    name: "total",
    label: "TOTAL",
    align: "left",
    field: (row) => formatCurrency(row.total),
    sortable: true,
  },
];

const cart = useCart();
const products = useProduct();
const transactions = useTransactions();

const currentDate = moment().format("MMMM Do YYYY, h:mm A");

let subTotal = computed(() => {
  let total = 0;
  cart.value.map((item) => {
    if (item.total) {
      total += item.total;
    }
  });

  return total;
});

let grandTotal = computed(
  () =>
    parseFloat(subTotal.value) + parseFloat(transactionData.deliveryFee ?? 0)
);

const padNumber = (val) => val.toString().padStart(7, 0);

const amountReceived = [
  (v) =>
    (v && parseFloat(v) >= parseFloat(grandTotal.value)) ||
    `Amount should be equal or greater than ${formatCurrency(
      grandTotal.value
    )}`,
];

const checkoutTransaction = () => {
  checkoutForm.value.validate().then((success) => {
    if (success) {
      isBtnLoading.value = true;

      cart.value.map((item) => {
        products.value.map((prod) => {
          if (prod.id == item.id) {
            prod.stocks = parseInt(prod.stocks) - parseInt(item.qty);
          }
        });
      });

      transactions.value.unshift({
        id: transactions.value.length + 1,
        ...transactionData,
        totalAmount: grandTotal.value,
        change:
          parseFloat(transactionData.amountReceived) -
          parseFloat(grandTotal.value),
        items: [...cart.value],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      setTimeout(() => {
        $q.notify({
          position: "top",
          color: "green",
          icon: "done_all",
          message: "Transaction has been successful",
        });

        cart.value = [];
        isBtnLoading.value = false;

        router.push("/");
      }, 1000);
    } else {
      $q.notify({
        position: "top",
        color: "red",
        icon: "done_all",
        message: "Error! Please check the amount tendered",
      });
    }
  });
};
</script>

<style lang="scss">
.sticky-price-table {
  max-width: 600px;

  & thead tr:last-child th:last-child {
    /* bg color is important for th; just specify one */
    background-color: #fff;
  }
  & td:last-child {
    background-color: #dce3f5;
  }
  & th:last-child,
  td:last-child {
    position: sticky;
    right: 0;
    z-index: 1;
  }
}
</style>
