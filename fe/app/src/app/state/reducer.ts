import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./state";
import { UserReducer } from "../features/user/state";
import { TrackerReducer } from "../features/tracker/state";

export const AppReducers: ActionReducerMap<AppState> = {
	user: UserReducer,
	tracker: TrackerReducer,
}