import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { BlogService } from '../../services/blog.service';
import { BlogPost, Category } from '../../models/blog-post.model';

@Component({
  selector: 'app-home',
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
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  featuredPosts: BlogPost[] = [];
  recentPosts: BlogPost[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadFeaturedPosts();
    this.loadRecentPosts();
  }

  private loadCategories(): void {
    this.blogService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  private loadFeaturedPosts(): void {
    this.blogService.getBlogPosts().subscribe(posts => {
      this.featuredPosts = posts.slice(0, 3); // Get first 3 posts as featured
    });
  }

  private loadRecentPosts(): void {
    this.blogService.getBlogPosts().subscribe(posts => {
      this.recentPosts = posts.slice(0, 6); // Get first 6 posts as recent
    });
  }

  getCategoryColor(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category?.color || '#666';
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category?.name || categoryId;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
