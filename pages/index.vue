<template>
  <div>
    <products-list :products="products" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductsList from '../components/ProductsList.vue';
export default {
  components: {
    ProductsList,
  },
  async asyncData({ app, route, params, error, store }) {
    try {
      await store.dispatch('getProductsList');
    } catch (err) {
      console.log(err);
      return error({
        statusCode: 404,
        message: 'Продукты не найдены или сервер не доступен',
      });
    }
  },
  computed: {
    ...mapState({
      products: 'productsList',
    }),
  },
};
</script>
