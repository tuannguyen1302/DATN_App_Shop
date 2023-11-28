import React from 'react';
import navigationStrings from '../constants/navigationStrings';
import TabRoutes from './TabRoutes';
import * as Screens from '../screens';

export default function (Stack) {
  return (
    <>
      {/* <Stack.Screen
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
      /> */}
      <Stack.Screen name={navigationStrings.TAB_ROUTER} component={TabRoutes} />
      <Stack.Screen
        name={navigationStrings.MESSAGES}
        component={Screens.MessageScreen}
        options={{headerShown: true, title: 'Tin nhắn'}}
      />
      <Stack.Screen
        name={navigationStrings.CHAT_MESSAGS}
        component={Screens.MessItem}
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
        name={navigationStrings.ADD_PRODUCT}
        component={Screens.AddProduct}
      />
      <Stack.Screen
        name={navigationStrings.UPDATE_PRODUCT}
        component={Screens.UpdateProduct}
      />
      <Stack.Screen
        name={navigationStrings.ORDER_SCREEN}
        component={Screens.OrderScreen}
        options={{
          headerShown: true,
          title: 'Đơn hàng',
          headerTransparent: true,
        }}
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
        options={{
          headerShown: true,
          title: 'Thống kê',
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name={navigationStrings.INVENTORY}
        component={Screens.InventoryScreen}
        options={{
          headerShown: true,
          title: 'Kho hàng',
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name={navigationStrings.NGANH_SP}
        component={Screens.Nganhsp}
      />
      <Stack.Screen
        name={navigationStrings.PHAN_LOAI_SP}
        component={Screens.PhanLoaiSP}
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
    </>
  );
}
