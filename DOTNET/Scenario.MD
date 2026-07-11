## Multiple users update the same record simultaneously. How would you handle concurrency in EF Core?

I would usually use optimistic concurrency with a SQL Server `rowversion` column. The client sends the original row version during the update, and EF Core includes it in the `WHERE` condition. If another user has already changed the record, EF Core throws `DbUpdateConcurrencyException`. I would then return `409 Conflict` and use a database-wins, client-wins, or merge strategy depending on the business requirement.

## Your application starts receiving thousands of requests per minute. How would you improve scalability?

I would first measure where the bottleneck is. Then I would make the API stateless, scale it horizontally behind a load balancer, add distributed caching, optimize database queries, use async I/O, move heavy work to queues, and add rate limiting and resiliency policies. I would validate each improvement using load testing and monitor P95 latency, throughput, errors, and resource usage.

## An API endpoint consistently takes over 10 seconds to respond. How would you identify the bottleneck?

I would use distributed tracing to divide the 10-second request into application, database, external service, and serialization timings. Then I would investigate the slowest stage using SQL execution plans, dependency metrics, application profiling, and infrastructure counters. I would fix the actual bottleneck, load-test the endpoint, and verify the improvement using P95 and P99 latency.

## How would you protect a REST API against SQL Injection, XSS, and CSRF?

I would prevent SQL Injection by using EF Core or parameterized queries and never concatenating user input into SQL. For XSS, I would return JSON, encode output, sanitize any allowed HTML, and avoid unsafe frontend rendering. For CSRF, if the API uses cookie authentication, I would use anti-forgery tokens, secure SameSite cookies, origin validation, and explicit CORS rules. With bearer-token authentication, CSRF risk is lower, but strong XSS protection remains essential.

## How would you design secure communication between microservices?

I would use TLS for all internal communication and mTLS where stronger service authentication is needed. Each service would have its own workload identity and use short-lived OAuth client-credentials tokens with audience and scope validation. I would enforce least-privilege authorization at every receiving service, store secrets in a vault, restrict network paths, and secure message brokers with per-topic permissions. I would also add idempotency, certificate rotation, distributed tracing, and audit logs so communication remains secure, resilient, and traceable.
