import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../features/AuthSlice'
import userSlice from 'features/UserSlice';
import productSlice from 'features/ProductSlice';
import cartSlice from 'features/CartSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    product: productSlice,
    cart: cartSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
