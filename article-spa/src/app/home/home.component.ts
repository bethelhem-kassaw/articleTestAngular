import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, startWith } from 'rxjs/operators';
import { ArticleService } from '../services/article.service';
import { loadArticles } from '../store/article.actions';
import { selectAllArticles } from '../store/article.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articles: any[] = [];
  filteredArticles: any[] = [];
  searchControl = new FormControl('');

  constructor(private articleService: ArticleService, private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectAllArticles).subscribe(articles => {
      this.articles = articles;
      this.filteredArticles = articles;
    });

    this.articleService.getArticles().subscribe((data: any) => {
      this.store.dispatch(loadArticles({ articles: data }));
    });

    this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterArticles(value!))
    ).subscribe(filtered => this.filteredArticles = filtered);
  }

  filterArticles(keyword: string): any[] {
    if (!keyword) {
      return this.articles;
    }

    keyword = keyword.toLowerCase();
    return this.articles.filter(article =>
      article.title.toLowerCase().includes(keyword) ||
      article.summary.toLowerCase().includes(keyword)
    );
  }

  highlight(text: string): string {
    if (!this.searchControl.value) {
      return text;
    }
    const regex = new RegExp(`(${this.searchControl.value})`, 'gi');
    return text.replace(regex, `<span class="highlighted-text">$1</span>`);
  }
}
