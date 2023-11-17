import { createSlice } from "@reduxjs/toolkit";
import { fetchOffers } from "../thunks/offers.thunks";

const initialState = {
  offers: [],
  totalPrice: 0,
  loading: false,
};

export const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    changeSelectedQty: (state, action) => {
      const { id, selectedQty } = action.payload;

      console.log("Action Payload:", action.payload);

      // TODO: save chosen Offer selected state to the store
      const selectedOffer = state.offers.find((offer) => offer.id === id);

      if (selectedOffer) {
        // Обновление выбранного состояния для выбранного предложения        
        selectedOffer.selectedQty = isNaN(selectedQty) ? 0 : selectedQty;

        // Расчет общей суммы
        state.totalPrice = state.offers.reduce(
          (total, offer) => total + offer.price * (offer.selectedQty || 0),
          0
        );        
      }
    },
  },
  extraReducers: (builder) => {
    // TODO: handle asyncThunk state changes here: display/hide loader, add Offers to the store
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { changeSelectedQty } = offersSlice.actions;

export default offersSlice.reducer;
