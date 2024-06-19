import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: any;

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit(): void {
    const articleId = +this.route.snapshot.paramMap.get('id')!;
    console.log('Article ID from route:', articleId); // Debug: Check if article ID is retrieved correctly
    
    this.articleService.getArticleById(articleId).subscribe(article => {
      console.log('Fetched Article:', article); // Debug: Check if article is fetched correctly
      this.article = article;
    });
  
  }
}
