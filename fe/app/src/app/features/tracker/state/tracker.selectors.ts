import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrackerFeatureKey, TrackerState } from './tracker.reducer';

export const SelectTrackerFeatureKey = createFeatureSelector<TrackerState>(TrackerFeatureKey);

export const SelectCompany = createSelector(
	SelectTrackerFeatureKey,
	(state: TrackerState) => {
		return state.company.retrieve;
	}
);

export const SelectCompanies = createSelector(
	SelectTrackerFeatureKey,
	(state: TrackerState) => {
		return state.company.list;
	}
);

export const SelectEmployees = createSelector(
	SelectTrackerFeatureKey,
	(state: TrackerState) => {
		return state.employees;
	}
);

export const SelectAssets = createSelector(
	SelectTrackerFeatureKey,
	(state: TrackerState) => {
		return state.assets;
	}
);