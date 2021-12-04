import { CartStateType, RootStateType } from './store.types';
import { ActionContext } from 'vuex';

export const state = (): CartStateType => ({
  products: [],
  version: '0.0.1',
});

export const mutations = {
  ADD_PRODUCT(state: CartStateType, product: any) {
    // if cart doesn't have product add it
    if (!state.products.find((p) => product.id === p.id)) {
      state.products = [...state.products, product];
    }
  },

  SET_PRODUCT(state: CartStateType, { productId, data }: any) {
    state.products = [
      ...state.products.filter((prod) => prod.id !== productId),
      data,
    ];
  },

  REMOVE_PRODUCT(state: CartStateType, productId: string) {
    state.products = Array.from(
      state.products.filter((prod) => prod.id !== productId)
    );
  },
};

export const actions = {
  async addProduct(
    { commit }: ActionContext<CartStateType, RootStateType>,
    data: any
  ) {
    await commit('ADD_PRODUCT', data);
  },

  async removeProduct(
    { commit }: ActionContext<CartStateType, RootStateType>,
    productId: string
  ) {
    await commit('REMOVE_PRODUCT', productId);
  },
};

export const getters = {
  getProductsInCart: ({ products }: CartStateType) => {
    return products.sort((a, b) => a.order - b.order);
  },
};
