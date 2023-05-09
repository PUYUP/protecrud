import { TrackerState } from "../features/tracker/state";
import { UserState } from "../features/user/state";

export interface AppState {
	user: UserState,
	tracker: TrackerState,
}