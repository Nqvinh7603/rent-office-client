import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBuilding } from "../../interfaces";

interface AppointmentState {
    buildings: IBuilding[];
}

const initialState: AppointmentState = {
    buildings: [],
};

const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {
        addBuilding: (state, action: PayloadAction<IBuilding>) => {
            const existingBuilding = state.buildings.find(
                (building) => building.buildingId === action.payload.buildingId
            );
            if (!existingBuilding) {
                state.buildings.push(action.payload);
            }
        },
        removeBuilding: (state, action: PayloadAction<number>) => {
            state.buildings = state.buildings.filter(
                (building) => building.buildingId !== action.payload
            );
        },
        clearBuildings: (state) => {
            state.buildings = [];
        },
    },
});

export const { addBuilding, removeBuilding, clearBuildings } =
    appointmentSlice.actions;

export default appointmentSlice.reducer;