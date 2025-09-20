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

4. **TCP Connection**

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

6. **HTTP Request**

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

8. **HTTP Response**

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
