import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'angular', component: CategoryComponent, data: { categoryId: 'angular' } },
  { path: 'react', component: CategoryComponent, data: { categoryId: 'react' } },
  { path: 'csharp', component: CategoryComponent, data: { categoryId: 'csharp' } },
  { path: 'javascript', component: CategoryComponent, data: { categoryId: 'javascript' } },
  { path: 'sql', component: CategoryComponent, data: { categoryId: 'sql' } },
  { path: 'css', component: CategoryComponent, data: { categoryId: 'css' } },
  { path: 'html', component: CategoryComponent, data: { categoryId: 'html' } },
  { path: 'dotnet', component: CategoryComponent, data: { categoryId: 'dotnet' } },
  { path: 'git', component: CategoryComponent, data: { categoryId: 'git' } },
  { path: 'linq', component: CategoryComponent, data: { categoryId: 'linq' } },
  { path: 'data-structures', component: CategoryComponent, data: { categoryId: 'data-structures' } },
  { path: 'system-design', component: CategoryComponent, data: { categoryId: 'system-design' } },
  { path: 'post/:id', component: PostDetailComponent },
  { path: '**', redirectTo: '' }
];
