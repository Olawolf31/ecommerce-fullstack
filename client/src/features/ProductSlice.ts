import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, getProductBySlug } from "../services/ProductService";
import { ProductType } from "../@types/ProductType";

interface ProductState {
  isLoading: boolean;
  products: ProductType[];
  singleProduct: ProductType | null;
  //productCategory: ProductType[]
}

const initialState: ProductState = {
  isLoading: false,
  products: [],
  singleProduct: null,
  //productCategory: []
};

//get all products thunk
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await getProducts();
    return response;
  }
);

//get product by slug thunk
export const fetchProductBySlug = createAsyncThunk(
  "product/fetchProductBySlug",
  async (slug: string | undefined) => {
    const response = await getProductBySlug(slug);
    return response;
  }
);

//productSlice
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //get all products
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.payload;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.isLoading = false;
    });

    //get product by slug
    builder.addCase(fetchProductBySlug.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductBySlug.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleProduct = action.payload.payload;
    });
    builder.addCase(fetchProductBySlug.rejected, (state) => {
      state.isLoading = false;
    });
  },
});



export default productSlice.reducer;
