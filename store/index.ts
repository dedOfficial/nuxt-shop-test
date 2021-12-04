import { RootStateType } from './store.types';
import { ActionContext } from 'vuex';

export const state = (): RootStateType => ({
  productsList: [],
});

export const mutations = {
  SET_PRODUCTS_LIST(state: RootStateType, products: any[]) {
    state.productsList = products;
  },
};

export const actions = {
  async getProductsList({
    commit,
  }: ActionContext<RootStateType, RootStateType>) {
    try {
      const products = await (
        await fetch('https://fakestoreapi.com/products')
      ).json();

      await commit('SET_PRODUCTS_LIST', products);
    } catch (err) {
      console.log(err);
      throw new Error('Внутреняя ошибка сервера, сообщите администратору');
    }
  },
};
