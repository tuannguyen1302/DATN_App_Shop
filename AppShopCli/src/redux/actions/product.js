import {CATERGORY_API, PRODUCT_API} from '../../config/urls';
import {apiGet} from '../../utils/utils';
import {saveProduct, saveType} from '../reducers/product';
import store from '../store';

export const saveProductData = async text => {
  try {
    // /ofCategoryForShop/🆔q
    const res = await apiGet(`${PRODUCT_API}/getAllProductByShop/${text}`);
    const productData = res?.message;
    store.dispatch(saveProduct({value: text, data: productData}));
    return true;
  } catch (error) {
    throw error;
  }
};

export const updateProductData = async data => {
  try {
    const endpoint = `${PRODUCT_API}${
      data?.isDraft ? '/unpublishById' : '/publishById'
    }/${data?.productId}`;
    await apiPut(endpoint);
    store.dispatch(updateProductData(data));
    return true;
  } catch (error) {
    throw error;
  }
};

export const saveTypeData = async () => {
  try {
    const res = await apiGet(`${CATERGORY_API}/getAllCategory`);
    store.dispatch(saveType(res?.message?.category));
  } catch (error) {
    throw error;
  }
};
