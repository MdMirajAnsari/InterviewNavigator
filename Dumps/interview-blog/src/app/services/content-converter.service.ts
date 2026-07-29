import { Injectable } from '@angular/core';
import { BlogPost } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class ContentConverterService {

  constructor() { }

  convertMarkdownToBlogPost(markdownContent: string, title: string, category: string): BlogPost {
    // Extract the first few sentences as excerpt
    const excerpt = this.extractExcerpt(markdownContent);

    // Extract tags from content
    const tags = this.extractTags(markdownContent);

    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = markdownContent.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    return {
      id: this.generateId(title),
      title: title,
      category: category,
      content: this.formatContent(markdownContent),
      excerpt: excerpt,
      tags: tags,
      date: new Date(),
      author: 'Miraj',
      readTime: readTime
    };
  }

  private extractExcerpt(content: string): string {
    // Take first 200 characters and add ellipsis
    const excerpt = content.substring(0, 200).trim();
    return excerpt.length < content.length ? excerpt + '...' : excerpt;
  }

  private extractTags(content: string): string[] {
    const tags: string[] = [];

    // Extract common programming terms
    const programmingTerms = [
      'Angular', 'React', 'JavaScript', 'TypeScript', 'C#', 'SQL', 'CSS', 'HTML',
      'Components', 'Services', 'Observables', 'RxJS', 'State Management',
      'Dependency Injection', 'Routing', 'Forms', 'HTTP', 'Testing'
    ];

    programmingTerms.forEach(term => {
      if (content.includes(term)) {
        tags.push(term);
      }
    });

    return tags.slice(0, 5); // Limit to 5 tags
  }

  private generateId(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private formatContent(content: string): string {
    // Convert markdown to HTML-like content
    let formatted = content;

    // Convert code blocks
    formatted = formatted.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<div class="code-block"><pre><code>${code.trim()}</code></pre></div>`;
    });

    // Convert inline code
    formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Convert headers
    formatted = formatted.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    formatted = formatted.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    formatted = formatted.replace(/^# (.*$)/gm, '<h1>$1</h1>');

    // Convert lists
    formatted = formatted.replace(/^\* (.*$)/gm, '<li>$1</li>');
    formatted = formatted.replace(/^- (.*$)/gm, '<li>$1</li>');

    // Wrap lists
    formatted = formatted.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');

    // Convert paragraphs
    formatted = formatted.replace(/^(?!<[h|u|d|p])(.+)$/gm, '<p>$1</p>');

    return formatted;
  }

  // Sample content from your existing files
  getSampleContent(): BlogPost[] {
    return [
      {
        id: 'angular-observables-rxjs',
        title: 'Angular Observables and RxJS Operators',
        category: 'angular',
        content: `
          <h2>Understanding RxJS Operators</h2>
          <p>RxJS operators are essential for working with Observables in Angular applications. They allow you to transform, filter, and combine data streams effectively.</p>

          <h3>mergeMap vs concatMap vs switchMap</h3>
          <p>These three operators are commonly used for handling multiple API calls, but they behave differently:</p>

          <h4>mergeMap</h4>
          <ul>
            <li>Flattens multiple inner Observables and subscribes to them concurrently</li>
            <li>All results are emitted as they complete, regardless of order</li>
            <li>Use when you want to process multiple API calls in parallel</li>
          </ul>

          <h4>concatMap</h4>
          <ul>
            <li>Maps each value to an Observable and subscribes to them one at a time</li>
            <li>Maintains the order of the source Observable</li>
            <li>Use for sequential API calls where order matters</li>
          </ul>

          <h4>switchMap</h4>
          <ul>
            <li>Maps each value to an Observable and subscribes to the latest one</li>
            <li>Cancels any previous in-flight Observables</li>
            <li>Use when you only care about the latest result</li>
          </ul>

          <h3>BehaviorSubject</h3>
          <p>A BehaviorSubject is a special type of Subject that holds a current value and emits it to new subscribers immediately upon subscription. It's perfect for state management scenarios.</p>

          <div class="code-block">
            <pre><code>import { BehaviorSubject } from 'rxjs';

const userState = new BehaviorSubject(null);

// Subscribe to get current value immediately
userState.subscribe(user => console.log('Current user:', user));

// Update the state
userState.next({ id: 1, name: 'John' });</code></pre>
          </div>
        `,
        excerpt: 'Learn about RxJS operators like mergeMap, concatMap, and switchMap, and understand how BehaviorSubject works for state management in Angular applications.',
        tags: ['Angular', 'RxJS', 'Observables', 'State Management', 'TypeScript'],
        date: new Date('2024-01-15'),
        author: 'Miraj',
        readTime: 8
      },
      {
        id: 'csharp-oop-concepts',
        title: 'C# Object-Oriented Programming Concepts',
        category: 'csharp',
        content: `
          <h2>Core OOP Principles in C#</h2>
          <p>Object-Oriented Programming is fundamental to C# development. Understanding these concepts is crucial for writing maintainable and scalable code.</p>

          <h3>Encapsulation</h3>
          <p>Encapsulation is the bundling of data and methods that operate on that data within a single unit or object, hiding the internal state and requiring all interaction to be performed through an object's methods.</p>

          <div class="code-block">
            <pre><code>public class BankAccount
{
    private decimal balance;

    public decimal Balance
    {
        get { return balance; }
        private set { balance = value; }
    }

    public void Deposit(decimal amount)
    {
        if (amount > 0)
            balance += amount;
    }
}</code></pre>
          </div>

          <h3>Inheritance</h3>
          <p>Inheritance allows a class to inherit properties and methods from another class, promoting code reuse and establishing a relationship between parent and child classes.</p>

          <h3>Polymorphism</h3>
          <p>Polymorphism allows objects to be treated as instances of their parent class while maintaining their own unique implementations of methods.</p>

          <h3>Abstraction</h3>
          <p>Abstraction hides complex implementation details and shows only the necessary features of an object.</p>
        `,
        excerpt: 'Master the four pillars of Object-Oriented Programming in C#: Encapsulation, Inheritance, Polymorphism, and Abstraction with practical examples.',
        tags: ['C#', 'OOP', 'Inheritance', 'Polymorphism', 'Encapsulation'],
        date: new Date('2024-01-16'),
        author: 'Miraj',
        readTime: 10
      },
      {
        id: 'javascript-es6-features',
        title: 'Modern JavaScript ES6+ Features',
        category: 'javascript',
        content: `
          <h2>Essential ES6+ Features for Modern JavaScript</h2>
          <p>ES6 (ECMAScript 2015) and subsequent versions have introduced powerful features that make JavaScript more expressive and easier to work with.</p>

          <h3>Arrow Functions</h3>
          <p>Arrow functions provide a concise syntax for writing function expressions and automatically bind the 'this' context.</p>

          <div class="code-block">
            <pre><code>// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With array methods
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);</code></pre>
          </div>

          <h3>Destructuring</h3>
          <p>Destructuring allows you to extract values from objects and arrays into distinct variables.</p>

          <div class="code-block">
            <pre><code>// Object destructuring
const user = { name: 'John', age: 30 };
const { name, age } = user;

// Array destructuring
const colors = ['red', 'green', 'blue'];
const [first, second] = colors;</code></pre>
          </div>

          <h3>Template Literals</h3>
          <p>Template literals provide an easy way to create multiline strings and embed expressions.</p>

          <h3>Promises and Async/Await</h3>
          <p>Modern JavaScript provides powerful tools for handling asynchronous operations.</p>
        `,
        excerpt: 'Explore essential ES6+ features including arrow functions, destructuring, template literals, and async/await for modern JavaScript development.',
        tags: ['JavaScript', 'ES6', 'Arrow Functions', 'Destructuring', 'Async/Await'],
        date: new Date('2024-01-17'),
        author: 'Miraj',
        readTime: 12
      }
    ];
  }
}
