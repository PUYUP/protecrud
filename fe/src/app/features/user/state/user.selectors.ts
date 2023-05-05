import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserFeatureKey, UserState } from './user.reducer';

export const SelectUserFeatureKey = createFeatureSelector<UserState>(UserFeatureKey);

export const SelectAuthentication = createSelector(
	SelectUserFeatureKey,
	(state: UserState) => {
		return state.authentication;
	}
);
