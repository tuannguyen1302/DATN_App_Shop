export const API_BASE_URL = 'https://dai.tongdaihoidap.com/';
//export const API_BASE_URL = 'https://fc5d-222-252-43-35.ngrok-free.app/';

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
export const CATERGORY_API = getApiUrl('v1/api/category');
export const OTP_API = getApiUrl('v1/api/access/verifyOtp');
export const OTP_FORGOT_API = getApiUrl('v1/api/access/verifyOtpForgot');
export const FORGOT_API = getApiUrl('v1/api/access/forgotPassword');
