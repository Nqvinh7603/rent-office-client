import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegionState {
    selectedRegion: string | null;
}

const initialState: RegionState = {
    selectedRegion: null,
};

const regionSlice = createSlice({
    name: "region",
    initialState,
    reducers: {
        setSelectedRegion(state, action: PayloadAction<string | null>) {
            state.selectedRegion = action.payload;
        },
    },
});

export const { setSelectedRegion } = regionSlice.actions;
export default regionSlice;