import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { BlogService } from '../../services/blog.service';
import { BlogPost, Category } from '../../models/blog-post.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  category: Category | undefined;
  posts: BlogPost[] = [];
  categoryId: string = '';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.categoryId = data['categoryId'];
      this.loadCategory();
      this.loadPosts();
    });
  }

  private loadCategory(): void {
    this.blogService.getCategoryById(this.categoryId).subscribe(category => {
      this.category = category;
    });
  }

  private loadPosts(): void {
    this.blogService.getBlogPostsByCategory(this.categoryId).subscribe(posts => {
      this.posts = posts;
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
