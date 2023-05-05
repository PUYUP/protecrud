import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./state";
import { UserReducer } from "../features/user/state";

export const AppReducers: ActionReducerMap<AppState> = {
	user: UserReducer,
}