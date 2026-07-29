# Deployment Guide for Interview Navigator Blog

This guide will help you deploy your Interview Navigator blog to various hosting platforms.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git repository

### Build for Production
```bash
npm run build
```

The build artifacts will be stored in the `dist/interview-blog/` directory.

## 📦 Deployment Options

### 1. Netlify (Recommended)

#### Option A: Drag & Drop
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist/interview-blog` folder to the deploy area
4. Your site will be live instantly

#### Option B: Git Integration
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist/interview-blog`
5. Deploy automatically on every push

### 2. Vercel

#### Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Using Vercel Dashboard
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Angular and deploy

### 3. GitHub Pages

#### Setup
1. Add to `angular.json`:
```json
{
  "projects": {
    "interview-blog": {
      "architect": {
        "build": {
          "options": {
            "baseHref": "/interview-blog/"
          }
        }
      }
    }
  }
}
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add to `package.json`:
```json
{
  "scripts": {
    "deploy": "ng build --base-href=/interview-blog/ && gh-pages -d dist/interview-blog"
  }
}
```

4. Deploy:
```bash
npm run deploy
```

### 4. Firebase Hosting

#### Setup
1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase:
```bash
firebase init hosting
```

4. Build and deploy:
```bash
npm run build
firebase deploy
```

### 5. AWS S3 + CloudFront

#### Setup
1. Create an S3 bucket
2. Enable static website hosting
3. Upload build files:
```bash
aws s3 sync dist/interview-blog s3://your-bucket-name
```

4. Configure CloudFront for CDN

## 🔧 Environment Configuration

### Environment Variables
Create `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-url.com',
  // Add other production settings
};
```

### Base Href Configuration
For subdirectory deployment, update `angular.json`:
```json
{
  "baseHref": "/your-subdirectory/"
}
```

## 📊 Performance Optimization

### Pre-build Optimizations
1. **Image Optimization**: Use WebP format and proper sizing
2. **Code Splitting**: Angular CLI handles this automatically
3. **Tree Shaking**: Remove unused code
4. **Minification**: Production builds are minified

### Post-deployment Optimizations
1. **CDN**: Use CloudFront, Cloudflare, or similar
2. **Caching**: Set proper cache headers
3. **Compression**: Enable gzip/brotli compression
4. **HTTP/2**: Enable HTTP/2 on your server

## 🔍 SEO Configuration

### Meta Tags
Update `src/index.html`:
```html
<meta name="description" content="Your description">
<meta name="keywords" content="your, keywords">
<meta property="og:title" content="Your Title">
<meta property="og:description" content="Your Description">
<meta property="og:image" content="your-image-url">
```

### Sitemap
Generate a sitemap.xml for better SEO:
```bash
npm install --save-dev sitemap
```

### Robots.txt
Create `src/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://yoursite.com/sitemap.xml
```

## 🔒 Security Considerations

### HTTPS
- Always use HTTPS in production
- Redirect HTTP to HTTPS
- Set HSTS headers

### Content Security Policy
Add to `src/index.html`:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

### Security Headers
Configure your hosting provider to include:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy

## 📈 Analytics Setup

### Google Analytics
Add to `src/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Custom Analytics
Create a service for custom analytics:
```typescript
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  trackPageView(page: string) {
    // Your analytics code
  }
}
```

## 🚨 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules
npm install
```

#### Routing Issues
- Ensure `baseHref` is set correctly
- Configure server to handle Angular routing
- Use HashLocationStrategy if needed

#### Performance Issues
- Check bundle size with `npm run build --stats-json`
- Analyze with webpack-bundle-analyzer
- Optimize images and assets

### Debug Mode
Enable debug mode in production:
```typescript
// main.ts
if (!environment.production) {
  console.log('Debug mode enabled');
}
```

## 📞 Support

For deployment issues:
1. Check the hosting provider's documentation
2. Review Angular deployment guide
3. Check browser console for errors
4. Verify build output

## 🎉 Success!

Once deployed, your Interview Navigator blog will be live and accessible to help developers prepare for technical interviews!

---

**Happy Deploying! 🚀** 