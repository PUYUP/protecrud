import { TrackerEffects } from "../features/tracker/state";
import { UserEffects } from "../features/user/state";

export const AppEffects  = [
	UserEffects,
	TrackerEffects,
];
