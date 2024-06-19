import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticleState } from './article.reducer';

export const selectArticleState = createFeatureSelector<ArticleState>('articles');

export const selectAllArticles = createSelector(
  selectArticleState,
  (state: ArticleState) => state.articles
);
