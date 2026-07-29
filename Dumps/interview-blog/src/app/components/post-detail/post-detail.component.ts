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
  selector: 'app-post-detail',
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
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit {
  post: BlogPost | undefined;
  category: Category | undefined;
  relatedPosts: BlogPost[] = [];

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const postId = params['id'];
      this.loadPost(postId);
    });
  }

  private loadPost(postId: string): void {
    this.blogService.getBlogPostById(postId).subscribe(post => {
      this.post = post;
      if (post) {
        this.loadCategory(post.category);
        this.loadRelatedPosts(post.category, postId);
      }
    });
  }

  private loadCategory(categoryId: string): void {
    this.blogService.getCategoryById(categoryId).subscribe(category => {
      this.category = category;
    });
  }

  private loadRelatedPosts(categoryId: string, currentPostId: string): void {
    this.blogService.getBlogPostsByCategory(categoryId).subscribe(posts => {
      this.relatedPosts = posts.filter(post => post.id !== currentPostId).slice(0, 3);
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
