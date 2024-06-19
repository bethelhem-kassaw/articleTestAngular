import { createReducer, on, Action } from '@ngrx/store';
import { loadArticles } from './article.actions';

export interface ArticleState {
  articles: any[];
}

export const initialState: ArticleState = {
  articles: []
};

const _articleReducer = createReducer(
  initialState,
  on(loadArticles, (state, { articles }) => ({ ...state, articles }))
);

export function articleReducer(state: ArticleState | undefined, action: Action) {
  return _articleReducer(state, action);
}
