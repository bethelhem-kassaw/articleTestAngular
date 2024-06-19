import { createAction, props } from '@ngrx/store';

export const loadArticles = createAction('[Article] Load Articles', props<{ articles: any[] }>());