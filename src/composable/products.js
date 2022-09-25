import { ref, watch, onMounted, onUnmounted } from "vue";

const useProductData = (key, defaultValue) => {
  const data = ref(defaultValue);

  const readData = () => {
    const v = localStorage.getItem(key);
    if (v) data.value = JSON.parse(v);
  };

  readData();

  onMounted(() => {
    window.addEventListener("storage", readData);
  });

  onUnmounted(() => {
    window.addEventListener("storage", readData);
  });

  const write = () => {
    window.localStorage.setItem(key, JSON.stringify(data.value));
  };

  watch([data], write, { deep: true });

  return data;
};

export const useProduct = () => {
  return useProductData("products", []);
};
