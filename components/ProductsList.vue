<template>
  <div class="products-list">
    <h2>Список продуктов:</h2>
    <div class="wrapper">
      <div v-for="product in products" :key="product.id" class="block">
        <div class="product">
          <span class="product-title">{{ product.title }}</span>
          <div class="image-wrap">
            <img :src="product.image" v-lazy="product.image" />
          </div>
          <span class="product-price">{{ product.price }}$</span>
          <div class="product-controls">
            <add-cart-button :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AddCartButton from './AddCartButton.vue';
export default {
  components: { AddCartButton },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.products-list {
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-between;
  align-items: center;
}
.block {
  display: flex;
  flex-direction: column;
}

.product {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  .image-wrap {
    width: 100%;
    height: 400px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
}
</style>
