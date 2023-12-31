import React from 'react';
import navigationStrings from '../constants/navigationStrings';
import TabRoutes from './TabRoutes';
import * as Screens from '../screens';

export default function (Stack) {
  return (
    <>
      <Stack.Screen
        name={navigationStrings.WELCOME1}
        component={Screens.GetStart}
      />
      <Stack.Screen
        name={navigationStrings.WELCOME2}
        component={Screens.GetStart2}
      />
      <Stack.Screen
        name={navigationStrings.LOGIN1}
        component={Screens.Login1}
      />
      <Stack.Screen
        name={navigationStrings.LOGIN2}
        component={Screens.Login2}
      />
      <Stack.Screen
        name={navigationStrings.SIGNUP}
        component={Screens.SignUp}
      />
      <Stack.Screen name={navigationStrings.TAB_ROUTER} component={TabRoutes} />
      <Stack.Screen
        name={navigationStrings.CHAT_MESSAGS}
        component={Screens.MessItem}
      />
      <Stack.Screen
        name={navigationStrings.NOTIFI}
        component={Screens.NotifiScreen}
      />
      <Stack.Screen
        name={navigationStrings.NOTIFI_ITEM}
        component={Screens.NotiItem}
      />
      <Stack.Screen
        name={navigationStrings.SEARCH}
        component={Screens.SearchScreen}
      />
      <Stack.Screen
        name={navigationStrings.PRODUCT}
        component={Screens.ProductScreen}
      />
      <Stack.Screen
        name={navigationStrings.PRODUCT_ITEM}
        component={Screens.ProductItem}
      />
      <Stack.Screen
        name={navigationStrings.ADD_PRODUCT}
        component={Screens.AddProduct}
      />
      <Stack.Screen
        name={navigationStrings.UPDATE_PRODUCT}
        component={Screens.UpdateProduct}
      />
      <Stack.Screen
        name={navigationStrings.ORDER_HISTORY}
        component={Screens.OrderHistory}
      />
      <Stack.Screen
        name={navigationStrings.SHOP}
        component={Screens.ShopScreen}
      />
      <Stack.Screen
        name={navigationStrings.SHOP_UPDATE}
        component={Screens.ShopUpdate}
      />
      <Stack.Screen
        name={navigationStrings.STATIS}
        component={Screens.StatisticalScreen}
      />
      <Stack.Screen
        name={navigationStrings.INVENTORY}
        component={Screens.InventoryScreen}
      />
      <Stack.Screen
        name={navigationStrings.PASSWORD}
        component={Screens.Password}
      />
      <Stack.Screen
        name={navigationStrings.NGANH_SP}
        component={Screens.Nganhsp}
      />
      <Stack.Screen
        name={navigationStrings.NGANH_SPUPDATE}
        component={Screens.NGANH_SPUPDATE}
      />
      <Stack.Screen
        name={navigationStrings.PHAN_LOAI_SP}
        component={Screens.PhanLoaiSP}
      />
      <Stack.Screen
        name={navigationStrings.PHAN_LOAI_SPUPDATE}
        component={Screens.PhanloaispUPDATE}
      />
      <Stack.Screen
        name={navigationStrings.DISCOUNT}
        component={Screens.Discountscreens}
      />
      <Stack.Screen
        name={navigationStrings.DISCOUNT_ITEM}
        component={Screens.DiscountItem}
      />
      <Stack.Screen
        name={navigationStrings.DISCOUNT_ADD}
        component={Screens.AddDiscount}
      />
      <Stack.Screen
        name={navigationStrings.DISCOUNT_UPDATE}
        component={Screens.UpdateDiscount}
      />
      <Stack.Screen
        name={navigationStrings.SETTING}
        component={Screens.SettingScreen}
      />
      <Stack.Screen
        name={navigationStrings.CONTACT}
        component={Screens.ContactSup}
      />
      <Stack.Screen
        name={navigationStrings.OTPScreen}
        component={Screens.OTPScreen}
      />
      <Stack.Screen
        name={navigationStrings.Updateprofile}
        component={Screens.Updateprofile}
      />
      <Stack.Screen

        name={navigationStrings.DetailRating}
        component={Screens.DetailRating}
      />
      <Stack.Screen
        name={navigationStrings.FORGOT}
        component={Screens.ForgotScreen}
      />

    </>
  );
}
