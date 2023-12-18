import {CATERGORY_API, PRODUCT_API} from '../../config/urls';
import {apiGet, apiPut} from '../../utils/utils';
import {saveProduct, saveType} from '../reducers/product';
import store from '../store';

export const saveProductData = async (idType, text, sort) => {
  try {
    const res = await apiGet(
      `${PRODUCT_API}/${
        idType == 'null' ? 'getAllProductByShop' : 'ofCategoryForShop/' + idType
      }/${text}`,
    );
    const productData = res?.message.length
      ? res?.message.sort((a, b) => {
          const priceA = a.product_price;
          const priceB = b.product_price;
          return sort === 'up' ? priceA - priceB : priceB - priceA;
        })
      : null;
    store.dispatch(saveProduct({value: text, data: productData}));
    return false;
  } catch (error) {
    // throw error;
  }
};

export const updateProductData = async data => {
  try {
    const endpoint = `${PRODUCT_API}${
      data?.isDraft ? '/unpublishById' : '/publishById'
    }/${data?.productId}`;
    await apiPut(endpoint);
    return true;
  } catch (error) {
    //throw error;
  }
};

export const saveTypeData = async () => {
  try {
    const res = await apiGet(`${CATERGORY_API}/getAllCategory`);
    store.dispatch(saveType(res?.message?.category));
  } catch (error) {
    //throw error;
  }
};
