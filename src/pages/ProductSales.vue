<template>
  <q-page class="q-pa-md md:q-pa-sm">
    <div ref="summary">
      <div>
        <p class="text-h6">Sales Summary</p>
        <p class="text-weight-regular text-subtitle1">
          Here is your sales for your store.
        </p>
      </div>
      <div class="row q-mt-md">
        <div class="col-12">
          <q-card flat class="shadow-2 bg-primary text-white q-px-sm">
            <q-card-section horizontal class="items-center row justify-between">
              <q-card-section>
                <p class="text-caption">Total Sales</p>
                <p class="text-h5 q-pt-sm">{{ formatCurrency(totalSales) }}</p>
              </q-card-section>
              <q-card-section>
                <q-icon name="payments" size="72px" />
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="q-mt-md">
        <p class="font-weight-bold text-h6">Transactions</p>
        <p>Shown on the table are all your transactions</p>
        <q-table
          class="q-mt-md"
          flat
          title=""
          :columns="columns"
          :rows="transactions"
          row-key="name"
        />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { computed } from "vue";
import { useTransactions } from "src/composable/transactions";
import { formatCurrency } from "../helpers/utilities";
import moment from "moment";
const transactions = useTransactions();

const columns = [
  {
    name: "id",
    label: "ID",
    align: "left",
    field: (row) => row.id,
    sortable: true,
  },
  {
    name: "totalitems",
    label: "# of Items",
    align: "left",
    field: (row) => row.items.length,
    sortable: true,
  },
  {
    name: "deliveryfee",
    label: "Delivery Fee",
    align: "left",
    field: (row) => row.deliveryFee,
    sortable: true,
  },
  {
    name: "totalamount",
    label: "Total",
    align: "left",
    field: (row) => row.totalAmount,
    sortable: true,
  },
  {
    name: "date",
    label: "Date",
    align: "left",
    field: (row) => moment(row.createdAt).format("MMMM Do YYYY, h:mm A"),
    sortable: true,
  },
];
let totalSales = computed(() => {
  let total = 0;

  transactions.value.map((trans) => {
    if (trans.totalAmount) {
      total += parseFloat(trans.totalAmount);
    }
  });
  return total;
});
</script>
