<template>
  <div class="cart">
    <h2>Корзина:</h2>
    <products-list :products="getProductsInCart" />
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import ProductsList from '../components/ProductsList.vue';
export default {
  components: {
    ProductsList,
  },
  computed: {
    ...mapGetters({
      getProductsInCart: 'cart/getProductsInCart',
    }),
  },
};
</script>
