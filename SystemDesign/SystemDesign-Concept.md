## What are solid principles ?

S- Single responsibility - Each class should have single job/responsibility.
O - Open/Closed Principle. Classes must be open to extension but closed to modification.
L - Liskov principle - If class A is subtype of class B then, Class B should be able to replace Class A with out disrupting the behaviour of our program.
I - Interface segregation - Clients should not be forced to depend on methods that they do not use.
D - Dependency inversion - High level modules should not depend on low level modules. Both must depend on abstraction.

## What is **DDD?**

Benefits of DDD in System DesignBusiness Alignment: The software reflects real-world business processes, improving usability and relevance.

Clear Communication: Ubiquitous language reduces misunderstandings between technical and business teams.

Flexibility: Modular bounded contexts allow the system to adapt to changing business requirements.

Maintainability: Clear boundaries and encapsulated logic make the codebase easier to maintain and evolve.

## **CQRS**(Command Query Responsibility **Segregation)**

CQRS (Command Query Responsibility Segregation) is a design pattern that separates the read and write operations of a system into two distinct models:

Command: Handles write operations (e.g., creating, updating, or deleting data). Commands modify the system’s state and typically don’t return data.
Query: Handles read operations (e.g., fetching data). Queries retrieve data without modifying the system’s state.

## GRPC (**g**oogle **R**emote **P**rocedure **C**all)

It uses **HTTP/2** as the transport protocol and **Protocol Buffers (Protobuf)** as the data serialization format.

**gRPC is great for microservices, high-performance internal communication, and real-time streaming** , whereas **REST is still more suitable for public APIs and browser-based apps**

gRPC is used because it **solves common problems in inter-service communication** in modern applications, especially **microservices** and  **high-performance systems** .

## NGINX

NGINX is a high-performance web server, reverse proxy, and load balancer known for its speed, stability, and low resource usage. It’s widely used for serving static content, proxying requests to application servers, and handling tasks like caching, load balancing, and SSL termination.

## N8N

n8n (pronounced "n-eight-n") is an open-source, low-code workflow automation platform that allows users to connect and automate tasks across various applications and services. It uses a node-based interface where "nodes" represent actions (e.g., sending an email, updating a spreadsheet, or fetching data from an API) that are linked to form workflows triggered by specific events. It supports over 400 integrations with tools like Google Sheets, Slack, and OpenAI, and offers flexibility for both no-code visual building and custom JavaScript/Python coding for advanced tasks.

## Forward Proxy

A forward proxy is a server that sits between a client (e.g., a user's device) and the internet, acting as an intermediary to forward client requests to external servers and return the responses. It’s typically used to enhance privacy, security, or control access.

## Reverse Proxy

A reverse proxy is a server that sits between external clients (e.g., users on the internet) and internal servers, forwarding client requests to the appropriate backend server and returning the server’s response to the client. It’s used to enhance security, performance, and scalability of web services.

## Repository Pattern

The Repository Pattern is a design pattern commonly used in software engineering to provide a clean and maintainable way to access and manage data between the business logic and the data storage layer (e.g., a database). It acts as an abstraction layer, decoupling the application’s business logic from the data access logic, making the codebase more modular, testable, and maintainable.

## Unit of Work

* Unit of Work: Acts as a coordinator that tracks changes to objects (e.g., insertions, updates, deletions) during a business transaction and commits them to the data store as a single unit. If any operation fails, the entire transaction is rolled back.
* Atomicity: Ensures that all changes are either fully applied or not applied at all, preventing partial updates.
* Change Tracking: Monitors changes to objects (e.g., entities in an ORM) and determines what needs to be persisted.
* Transaction Management: Manages database transactions, ensuring consistency and reducing the need for manual transaction handling in the business logic.
* Collaboration with Repositories: The Unit of Work typically works with one or more repositories, coordinating their operations to persist changes to the database.

Components1. Unit of Work Interface: Defines methods like commit, rollback, and methods to access repositories.

1. Concrete Unit of Work: Implements the interface, managing the transaction and coordinating with repositories.
2. Repositories: Used by the Unit of Work to perform CRUD operations on specific entities.
3. Data Context: Represents the connection to the data store (e.g., a database session in an ORM like Entity Framework or Hibernate).

## FAULT Tolerance

**Fault Tolerance** is the ability of a system to **continue operating correctly even if some of its components fail** (hardware, software, or network).

## Polly

**Polly** is a  **.NET resilience and transient-fault-handling library** .

It helps you build **fault-tolerant applications** by providing easy-to-use **policies** for handling failures (like retries, circuit breakers, timeouts, bulkhead isolation, and fallbacks).

Instead of writing custom `try/catch` everywhere, you define **resilience policies** once and wrap your code/HTTP calls with them.

```csharp
var retryPolicy = Policy
    .Handle<HttpRequestException>()
    .Retry(3);

```

```csharp
var waitAndRetryPolicy = Policy
    .Handle<HttpRequestException>()
    .WaitAndRetry(3, attempt => TimeSpan.FromSeconds(Math.Pow(2, attempt)));

```

```csharp
var waitAndRetryPolicy = Policy
    .Handle<HttpRequestException>()
    .WaitAndRetry(3, attempt => TimeSpan.FromSeconds(Math.Pow(2, attempt)));

```

```csharp
var circuitBreakerPolicy = Policy
    .Handle<HttpRequestException>()
    .CircuitBreaker(2, TimeSpan.FromSeconds(30));

```

```csharp
var timeoutPolicy = Policy
    .Timeout(2); // seconds

```

```csharp
var fallbackPolicy = Policy<string>
    .Handle<Exception>()
    .Fallback("Service temporarily unavailable");

```

```csharp
var bulkheadPolicy = Policy
    .Bulkhead(5, 10);

```

```csharp
var policyWrap = Policy.Wrap(
    fallbackPolicy,
    waitAndRetryPolicy,
    circuitBreakerPolicy
);

```

## Circuit Breaker

Stop calling a failing service for a while.

## Caching

**Caching** is the process of storing frequently accessed **data in a temporary storage layer (cache)** so that future requests can be served faster without recomputing or refetching.

```csharp
public class ProductsController : ControllerBase
{
    private readonly IMemoryCache _cache;
    private readonly ProductService _service;

    public ProductsController(IMemoryCache cache, ProductService service)
    {
        _cache = cache;
        _service = service;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProduct(int id)
    {
        var cacheKey = $"product_{id}";
        if (!_cache.TryGetValue(cacheKey, out Product product))
        {
            product = await _service.GetProductById(id);

            _cache.Set(cacheKey, product, TimeSpan.FromMinutes(10)); // cache 10 mins
        }
        return Ok(product);
    }
}

```

## Rate Limiting

Rate limiting restricts the number of requests a client can make to a server within a defined period (e.g., per second, minute, or hour). If the limit is exceeded, the server may reject additional requests, return an error (e.g., HTTP 429 Too Many Requests), or delay processing until the rate limit resets.

## Token Bucket

**Token Bucket** is a **rate-limiting algorithm** used to control how much data or how many requests can be sent or processed over time.

## Leacky Bucket

The **Leaky Bucket algorithm** is a **traffic shaping and rate limiting** technique that ensures  **a steady, constant output rate** , no matter how bursty the incoming traffic is.

## API Gateway

An **API Gateway** is the **single entry point** for all client requests to a  **microservices-based application** .

## Sliding Window

The **Sliding Window** is a **technique** used in programming and computer science to optimize problems involving **arrays or strings** where you need to examine a **subset (window)** of elements that moves (or "slides") through the data.

## Load Balancer

A **Load Balancer (LB)** is a component (hardware or software) that **distributes incoming network traffic across multiple servers (backend instances)** to ensure:

* No single server is overloaded.
* Higher availability & fault tolerance.
* Better scalability & performance.

Think of it like a **traffic cop** directing cars (requests) evenly across multiple lanes (servers).

## WebHook

A **webhook** is a mechanism that allows one application to send real-time data to another application when a specific event occurs, typically via an HTTP POST request. Often described as "user-defined HTTP callbacks," webhooks enable automated communication between systems without the need for constant polling. Here's a concise breakdown:**What Is a Webhook?* **A webhook is an event-driven integration where an application (the **sender**) pushes data to a predefined URL (the **receiver**) when a specific trigger or event happens.**

* **The receiver is typically another application or service that processes the data for further action.**
* **Webhooks are commonly used for real-time notifications, automation, and integrating disparate systems.**

How Webhooks Work1. **Setup**: The receiving application provides a URL (the webhook endpoint) to the sending application, often during configuration (e.g., in a dashboard or API settings).

1. **Event Trigger**: When a predefined event occurs in the sender (e.g., a new user signs up, a payment is made), it generates a payload (usually JSON or XML) containing event details.
2. **HTTP Request**: The sender makes an HTTP POST request to the receiver’s webhook URL, sending the payload.
3. **Processing**: The receiver processes the payload, performing actions like updating a database, sending notifications, or triggering workflows.

* **Webhooks**: Focus on sending event-driven data to a specific URL, typically one-way communication.
* **API Gateway**: Manages and routes API requests, handling authentication, rate limiting, and aggregation for multiple services. An API Gateway can expose webhook endpoints but serves broader purposes like load balancing and protocol translation.

## Idempotent API

An **idempotent API** is one where  **making the same request multiple times has the same effect as making it once** .

## What are DRY, YAGNI, KISS principles ?

DRY- Do not repeat yourself.
Avoid duplication. Makes the software more maintainable and less error-prone.

YAGNI - You are not going to need it.
Avoid unnecessary features/functionalities to the software. This helps software focussed on essential requirements and makes it more maintainable.

KISS: Keep the implementation simple,stupid.
Keeping the software design and implementation as simple as possible.
This make software more understandable,maintainable and testable.

## Facade Design Pattern

The **Facade Design Pattern** provides a **unified and simplified interface** to a  **complex subsystem** , making it easier for clients to interact with multiple classes.

Example: In a home theater system, the Facade (`HomeTheaterFacade`) simplifies control over several components like `DVDPlayer`, `Projector`, and `Lights`.

## SAGA Pattern

The **Saga Pattern** is a **microservices design pattern** used to manage **distributed transactions** and ensure **data consistency** across multiple services  **without using two-phase commit (2PC)** .

Types of Saga Patterns

**1. Choreography**:(Event-Based)

* **Microservices communicate via events (e.g., through a message broker like Kafka or RabbitMQ).**
* No central coordinator.
* Services communicate via  **events** .
* Example: Order Service → emits "OrderCreated" → Payment Service → emits "PaymentProcessed" → Inventory Service.
* If failure occurs, services listen for failure events and trigger compensation.

1. **Orchestration**:(Centralized)

* A **Saga Orchestrator (controller service)** coordinates the flow.
* Orchestrator tells each service what to do next.
* Easier to manage complex workflows, but adds a single point of control.

## Database per service pattern

The **Database per Service pattern** is a **microservices design principle** where **each microservice has its own database** (schema or instance), rather than sharing a single centralized database.

## GOF

It refers to the **four authors** of the famous book *"Design Patterns: Elements of Reusable Object-Oriented Software"* (1994):

## Aggregator Pattern

The **Aggregator Pattern** is a design pattern used in software engineering, particularly in distributed systems, microservices, or event-driven architectures, to collect and combine data from multiple sources into a single, cohesive response. It’s commonly used to simplify complex interactions between a client and multiple services by providing a unified interface.**Key Concepts***Purpose**: Aggregates data from various services or components to present a consolidated result to the client.

* **Use Case**: When a client needs data that spans multiple services (e.g., in microservices, where each service owns a specific domain).
* **Components**:
  * **Aggregator**: A service or component that orchestrates calls to multiple downstream services, collects their responses, and combines them.
  * **Downstream Services**: Independent services or APIs that provide specific pieces of data.
  * **Client**: The entity requesting the aggregated data (e.g., a UI or another service).
* **Process**:
  1. **The client sends a request to the aggregator.**
  2. **The aggregator makes parallel or sequential calls to the required services.**
  3. **The aggregator collects, transforms, and combines the responses.**
  4. **The aggregated result is returned to the client.**

Types of Aggregator Patterns1. **API Gateway as Aggregator**:

* **An API Gateway acts as the aggregator, routing requests to multiple microservices and combining their responses.**
* **Example: A product page in an e-commerce app fetching data from inventory, pricing, and reviews services.**

1. **Composite Service**:
   * **A dedicated service is created to aggregate data from other services.**
   * **Example: A "Order Summary" service that pulls data from "User," "Order," and "Payment" services.**
2. **Event-Driven Aggregator**:
   * **Uses events to collect data asynchronously, often with a message broker (e.g., Kafka, RabbitMQ).**
   * **Example: Aggregating user activity logs from multiple services via event streams.**

## Sidecar Pattern

The **Sidecar Pattern** is a **design pattern in microservices and cloud-native architectures** where you deploy an additional component (the  *sidecar* ) alongside your main service to provide **supplementary functionality** — without changing the main service’s code.

The term comes from the **motorcycle sidecar** 🏍️ → the main service is the motorcycle, and the sidecar is an attached unit that adds extra capabilities.

## Adaptor Pattern

The **Adapter Pattern** (also called  **Wrapper Pattern** ) is a **structural design pattern** that allows objects with **incompatible interfaces** to work together.

## Strangler Pattern

The Strangler Pattern (or Strangler Fig Pattern) is a software engineering approach used to incrementally replace an existing system (often a legacy system) with a new one. Instead of a complete, high-risk rewrite, the pattern involves gradually building new functionality around the edges of the old system, slowly "strangling" it until the legacy system is fully replaced or significantly reduced.

## CAP theorem

The **CAP theorem** (also called  **Brewer’s theorem** ) is a fundamental principle in  **distributed systems** .

It states that a distributed database system can only guarantee **two out of three** properties at the same time:

1. **C – Consistency**

   Every read receives the most recent write (all nodes see the same data at the same time).
2. **A – Availability**

   Every request receives a (non-error) response — but it might not be the most recent data.
3. **P – Partition Tolerance**

   The system continues to operate even if network failures occur that split communication between nodes.

## HLD and LLD

* **HLD sets the foundation by defining the system's structure and major components.**
* **LLD builds on HLD, breaking down each component into actionable implementation details.**
* **HLD ensures the system aligns with business goals; LLD ensures the system can be coded efficiently.**

Example in Context**For a ride-sharing app:*** **HLD**: Outlines components like user app, driver app, backend services (matching, routing), and database. It describes how the app communicates with the backend via APIs and uses a geolocation service.

* **LLD**: Details the matching algorithm (e.g., logic to pair riders with drivers), database schema for user data, and specific API endpoints like **/requestRide** with request/response formats.

## Distributed locking system

A **Distributed Locking System** is a mechanism used in **distributed systems or microservices** to ensure that only **one process/service/node** can access a **shared resource** at a time — preventing  **race conditions, duplicate work, or data corruption** .

## Apache Kafka

**Apache Kafka** is a  **distributed event streaming platform** .

It have High throughput

* Originally developed at  **LinkedIn** , now part of the  **Apache Software Foundation** .
* Designed for **real-time data pipelines** and  **stream processing** .
* Handles **high-throughput, fault-tolerant, scalable** event streaming.

## Zookeeper

**ZooKeeper** is an **open-source distributed coordination service** from Apache, used heavily in distributed systems (like  **Kafka, Hadoop, HBase** ). It helps manage **configuration, synchronization, naming, and leader election** in a cluster.

## Pub/Sub System

A **Pub/Sub system** (short for  **Publish–Subscribe** ) is a **messaging pattern** where senders (publishers) and receivers (subscribers) communicate through a **message broker** without being directly connected.

It’s widely used in  **event-driven architectures, distributed systems, and microservices** .

## CDN

A Content Delivery Network (CDN) is a geographically distributed network of servers that cache and deliver content to users from locations closest to them. The goal is to enhance the speed, reliability, and availability of content delivery while reducing latency and network congestion. CDNs store copies of static content (e.g., videos, images, web pages) on edge servers located at Internet Exchange Points (IXPs) or within Internet Service Provider (ISP) networks. By serving content from nearby servers, CDNs minimize the distance data travels, improving load times and user experience. They also reduce bandwidth costs, enhance redundancy, and provide security benefits like DDoS mitigation

## Event Sourcing

Event sourcing is a design pattern in software engineering where an application's state is derived by storing and replaying a sequence of events, rather than storing the current state directly. Each event represents a state change, capturing what happened, when, and why. These events are stored in an event log, which serves as the single source of truth.**Key Concepts:1. **Events as the Source of Truth**: Instead of updating a database with the current state (e.g., updating a user's balance in a table), you append immutable events (e.g., "UserDepositedMoney: $100") to an event store.

1. **Rebuilding State**: The application's current state is computed by replaying all relevant events in order. For example, to determine a user's account balance, you sum all deposit and withdrawal events.
2. **Immutability**: Events are never modified or deleted; they are appended to the log, ensuring a complete audit trail.
3. **Event Store**: A specialized database or log that stores the sequence of events, optimized for appending and retrieving events.

## ElasticSearch

**Elasticsearch** is a **distributed, RESTful search and analytics engine** built on top of  **Apache Lucene** .

* It stores data in a way optimized for  **full-text search, filtering, and analytics** .
* Often used for  **search engines, log analysis, and real-time analytics** .
* Part of the **Elastic Stack (ELK/EFK)** → Elasticsearch, Logstash/Fluentd, Kibana.

## AutoScaling

**AutoScaling** is the ability of a system (usually in cloud computing) to **automatically adjust computing resources** — scaling **up** (add more capacity) or **down** (reduce capacity) — based on workload demand.

## WebSocket

**WebSocket** is a **full-duplex, persistent communication protocol** that allows **real-time, two-way communication** between a **client (browser/app)** and a **server** over a  **single TCP connection** .

* Unlike  **HTTP** , which is request-response based, WebSocket allows the **server to push data** to the client **without waiting** for a request.
* Standardized as  **RFC 6455** .

## Vertical Scaling and Horizontal Scaling

* **Vertical Scaling** : You upgrade your database server from 16 GB RAM → 64 GB RAM to handle more queries.
* **Horizontal Scaling** : You add 10 app servers behind a load balancer to handle millions of web requests per second.

## Blue Green Deployment

**Blue-Green Deployment** is a **release strategy** where you run **two identical environments** (Blue and Green) to minimize downtime and risk when deploying new versions of an application.

* **Blue** → The currently running version (production).
* **Green** → The new version (candidate release).

When the **Green** environment is ready and tested, traffic is switched from  **Blue → Green** .

If something goes wrong, you can instantly roll back by redirecting traffic back to  **Blue** .

## Service Discovery

**Service Discovery** is the mechanism that allows services to **automatically find and communicate** with each other without hardcoding network locations.

## Database Sharding

**Sharding** is a database architecture pattern where a  **large database is split into smaller, faster, more manageable pieces called *shards*** .

* **Example: For a social media app, you might shard by **user_id**, so all data for a specific user resides in one shard.**

## Difference between **Load Balancer** and  **Reverse Proxy** .

A **reverse proxy** can act as a **load balancer** when it distributes traffic across multiple servers.

But not all reverse proxies are load balancers.

## What is **Idempotent API** and why is it important?

An **idempotent API** is an API endpoint that produces the **same result no matter how many times it is called** with the same input.

## Explain **gRPC** and how it differs from REST API.

**gRPC**

* High-performance **RPC framework** by Google.
* Uses **HTTP/2** and **Protocol Buffers** (binary, compact, strongly typed).
* Supports **unary & streaming** (client, server, bidirectional).
* Ideal for  **microservices and real-time communication** .

**REST API**

* Architectural style using **HTTP/1.1** and  **JSON/XML** .
* Request–response only, text-based, loosely typed.
* Simpler, widely supported, good for  **public web APIs** .

## Explain **ElasticSearch** basics.

## Difference between **WebSocket** and  **HTTP polling** .

* **Polling = client asks repeatedly**
* **WebSocket = server pushes immediately**

## What is **Distributed Locking System** and why is it used?

A **Distributed Locking System** is a mechanism that ensures **only one process or node can access a shared resource at a time** in a  **distributed system** .

## What is a  **Sidecar Pattern** ?

The **Sidecar Pattern** is a **microservices design pattern** where an additional helper container or service (the “sidecar”) runs alongside the main application container in the same **pod** or environment.

## How would you implement **resilience** in microservices?

**Resilience** is the ability of a microservices system to **handle failures gracefully** and continue operating without complete disruption.
