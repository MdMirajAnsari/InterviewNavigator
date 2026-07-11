## Your Angular application becomes noticeably slower as it grows. How would you optimize it?

I would first profile the application to determine whether the slowdown comes from change detection, rendering, network calls, bundle size, or memory leaks. Then I would apply `OnPush`, track list items, avoid template methods, lazy-load features, virtualize large lists, optimize RxJS subscriptions and API calls, reduce bundle size, and defer heavy components. Finally, I would measure the same performance metrics before and after each change.
