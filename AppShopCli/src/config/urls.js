export const API_BASE_URL = 'https://5700-116-96-44-199.ngrok-free.app/';

export const getApiUrl = endpoint => API_BASE_URL + endpoint;

export const SIGNIN_API = getApiUrl('v1/api/access/login');
export const SIGNUP_API = getApiUrl('v1/api/access/signup');
export const SIGNOUT_API = getApiUrl('v1/api/access/signOut');
export const PRODUCT_API = getApiUrl('v1/api/product');
export const CHAT_API = getApiUrl('v1/api/chat');
export const ORDER_API = getApiUrl('v1/api/checkout');
export const SHOP_API = getApiUrl('v1/api/shop');
export const DISCOUNT_API = getApiUrl('v1/api/discount');
export const NOTIFI_API = getApiUrl('v1/api/notification');
export const USER_API = getApiUrl('v1/api/user');
