## Designing a feature/module and explain approach?

## If an API keeps failing, how would you handle it in your code?

* **Retry with backoff** (don’t hammer server).
* **Fallback** to defaults or cache.
* **Circuit breaker** to avoid spamming broken APIs.
* **Timeout** to avoid hanging calls.
* **Log and alert** to detect issues.

## What happens behind the scenes when you type a URL in the browser and hit Enter?

2. **Browser Cache Lookup**

Before hitting the network, the browser checks:

1. **Browser cache** → Has the IP for this domain been cached recently?
2. **OS cache** → If not in browser, ask OS DNS cache.
3. **Hosts file** → If present, override with static mapping.

If found → skip DNS lookup.

3. **DNS Resolution**

If IP not cached:

1. Browser asks the **DNS resolver** (usually provided by ISP or Google DNS 8.8.8.8).
2. Resolver checks:

   * Local cache.
   * If not found → queries **Root DNS servers** → `.com` **TLD DNS servers** → authoritative DNS server for `example.com`.
3. Resolver returns the **IP address** (e.g. `93.184.216.34`) to the browser.
4. IP is cached for future use (based on DNS TTL).
5. **TCP Connection**

* Browser opens a **TCP connection** to the server IP on port `443` (HTTPS).
* Involves the  **TCP 3-way handshake** :
  1. SYN → Client → Server
  2. SYN-ACK → Server → Client
  3. ACK → Client → Server

     ✅ Now, a TCP connection is established.

5. **TLS Handshake (if HTTPS)**

Since the URL is `https://`:

1. **Client Hello** → Browser sends supported ciphers, random string.
2. **Server Hello** → Server picks cipher, sends digital certificate.
3. **Certificate verification** → Browser checks:

   * Issued by trusted CA?
   * Not expired/revoked?
   * Matches the domain (`CN=example.com`)?
4. If valid:

   * Browser and server exchange keys → derive **session keys** using Diffie-Hellman/ECDHE.
   * Now they can **encrypt** communication.
5. **HTTP Request**

Browser sends an **HTTP request** over the secure TCP/TLS channel:

7. **Server Processing**

On the server side:

1. **Web server (Nginx/Apache/Kestrel)** receives the request.
2. Routes it to the appropriate  **application (ASP.NET Core, Node.js, Django, etc.)** .
3. Application may:

   * Query a  **database** .
   * Call other  **APIs/microservices** .
   * Run business logic.
4. Generates a **response** (e.g. HTML page, JSON data, etc.).
5. **HTTP Response**

Server sends back:

9. **Browser Rendering Pipeline**

Browser receives HTML and begins rendering:

1. **HTML parsing** → Builds  **DOM tree** .
2. **CSS parsing** → Builds  **CSSOM tree** .
3. Combine DOM + CSSOM →  **Render Tree** .
4. **Layout** → Calculate positions, sizes.
5. **Painting** → Draw pixels for text, images, colors.
6. **Compositing** → Send to GPU for final rendering.

Meanwhile:

* If `<script>` tags found → browser downloads and executes JS (can block rendering).
* If `<link>` (CSS) or `<img>` → fetches additional resources.
* If resources come from other domains → repeats DNS/TCP/TLS handshake.

10. **Subsequent Optimizations**

* **Caching** : Browser caches static files (CSS/JS/images) using `Cache-Control` / `ETag`.
* **HTTP/2 multiplexing** : Allows multiple parallel requests over a single TCP connection.
* **Keep-Alive** : Reuses TCP connection for multiple requests.
* **Service Workers** : May serve resources from local cache (PWA behavior).

## How do you maintain Code Quality?

I maintain code quality by following clean coding principles and best practices like SOLID. I ensure all code changes go through peer review and automated static analysis tools such as SonarQube or Resharper. I also write unit and integration tests so that functionality is always verifiable. Additionally, I integrate these checks into our CI/CD pipeline, so every commit is automatically validated before merging. Over time, I also refactor to reduce technical debt and keep the codebase maintainable. This way, we ensure code is not only working but also scalable and easy to maintain.

## Why Should we hire you?

You should hire me because I bring a unique blend of hands-on .NET expertise and leadership experience. I’ve successfully designed and delivered scalable .NET Core microservices, implemented best practices like caching, circuit breakers, and API versioning, and optimized SQL Server performance in high-traffic systems. On the managerial side, I’ve led cross-functional teams, mentored junior developers, and introduced processes like automated CI/CD pipelines and structured code reviews to improve quality and reduce production issues. My strength is not just in solving technical problems but also in aligning technology decisions with business goals. I believe I can add value here by ensuring delivery with both speed and quality, while guiding the team towards long-term maintainability and scalability.

## Why do you want to join this Company?

I want to join this company because of its strong reputation for innovation and focus on building scalable enterprise solutions. I admire how your team has adopted modern technologies like .NET Core, cloud-native microservices, and DevOps practices, which perfectly align with my technical expertise. I’m also impressed by your focus on [industry/domain, e.g., fintech, healthcare, SaaS], which excites me as I enjoy solving complex business challenges with technology. I see this as a great opportunity where I can contribute my experience in building robust .NET systems while also learning from the talented people here and growing into larger leadership responsibilities.

## If one of your microservices is  **slowing down the system** , how would you identify, troubleshoot, and fix it?

If one of my microservices slows down the system, I’d start with distributed tracing and centralized logs to identify which service is causing latency. Then I’d analyze metrics like CPU, memory, DB queries, and external API calls to isolate the bottleneck. Based on findings, I’d optimize queries, add caching, implement async calls, or apply resilience patterns like circuit breakers. If needed, I’d scale the service horizontally. Finally, I’d ensure we have monitoring alerts and regular load testing to catch such issues early. This way, we solve not only the current issue but also prevent future slowdowns.

## What is your approach to **managing API versioning** in .NET Core for long-term projects?

My approach to API versioning in .NET Core is to define a clear versioning strategy upfront, usually using URL-based versioning for clarity. I leverage the ASP.NET Core API Versioning package to manage multiple versions, marking old ones as deprecated when needed. I ensure backward compatibility so existing clients are not broken, document each version with Swagger, and maintain governance so only a few versions remain active. This approach balances flexibility for new features while ensuring stability and trust for long-term consumers.

## When would you prefer **CQRS + Event Sourcing** in .NET projects?

I would prefer CQRS + Event Sourcing in .NET projects when the domain has complex business logic, and the read and write sides have different requirements — for example, in banking or e-commerce systems. Event Sourcing is especially valuable when we need a complete audit trail or the ability to reconstruct past states. CQRS allows us to optimize queries separately from commands, improving scalability. In .NET, I’d implement this with MediatR for commands/queries and an event store like EventStoreDB for event persistence. However, for simple CRUD applications, I’d avoid it since the overhead outweighs the benefits.

## How do you handle a situation where your **team is missing deadlines** repeatedly?

If my team is missing deadlines repeatedly, I’d first analyze the root cause — whether it’s poor estimation, scope creep, or external dependencies. Then I’d improve planning by breaking work into smaller tasks, tracking velocity, and committing only to realistic goals. I’d also ensure regular communication with stakeholders to flag risks early. On the team side, I’d provide mentoring, remove blockers, and balance workloads to avoid burnout. Finally, I’d use retrospectives and metrics to continuously improve. My approach is not to blame individuals, but to improve the process so we deliver consistently with quality.

## How do you balance  **technical debt vs delivery deadlines** ?

I balance technical debt vs deadlines by first categorizing the debt: if it’s critical and risks production, I address it immediately. If it’s manageable, I communicate trade-offs to stakeholders and negotiate for time — either by reserving a portion of each sprint for cleanup or by planning a refactoring sprint after release. I also encourage small, continuous refactorings during feature work so debt doesn’t accumulate. This way, deadlines are met without compromising long-term stability and maintainability.

## How would you explain a complex **.NET technical design** to a  **non-technical manager** ?

When I explain a complex .NET technical design to a non-technical manager, I avoid jargon and focus on the business outcomes — speed, cost, reliability, and customer impact. I use analogies and simple visuals to show how the system works, for example comparing an API Gateway to a receptionist. I always structure the explanation around the problem, the high-level solution, the benefits, and the trade-offs. This way, the manager understands the value without needing the technical details.
