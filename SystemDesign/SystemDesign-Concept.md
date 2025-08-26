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

## **CQRS**(Command **Query **Responsibility**Segregation)**

CQRS (Command Query Responsibility Segregation) is a design pattern that separates the read and write operations of a system into two distinct models:

Command: Handles write operations (e.g., creating, updating, or deleting data). Commands modify the system’s state and typically don’t return data.
Query: Handles read operations (e.g., fetching data). Queries retrieve data without modifying the system’s state.

## GRPC

gRPC is a high-performance, open-source framework for remote procedure calls (RPC) developed by Google. It uses HTTP/2 for transport, Protocol Buffers (Protobuf) for efficient data serialization, and supports multiple programming languages. gRPC is designed for low-latency, scalable, and distributed systems, making it ideal for microservices, mobile apps, and real-time communication.**Key features:* Bidirectional streaming: Supports client-streaming, server-streaming, and bidirectional streaming.

* Strong typing: Uses Protobuf for defining service contracts, ensuring type safety.
* Efficient: Binary serialization reduces payload size compared to JSON/XML.
* Language support: Includes C++, Java, Python, Go, Node.js, and more.
* Authentication: Supports TLS and token-based authentication.

Use cases:* Microservices communication

* Real-time data streaming
* Cross-platform APIs

To get started, define a .proto file with your service and message definitions, compile it using a Protobuf compiler, and implement the client and server logic in your preferred language.

# NGINX

NGINX is a high-performance web server, reverse proxy, and load balancer known for its speed, stability, and low resource usage. It’s widely used for serving static content, proxying requests to application servers, and handling tasks like caching, load balancing, and SSL termination.

# N8N

n8n (pronounced "n-eight-n") is an open-source, low-code workflow automation platform that allows users to connect and automate tasks across various applications and services. It uses a node-based interface where "nodes" represent actions (e.g., sending an email, updating a spreadsheet, or fetching data from an API) that are linked to form workflows triggered by specific events. It supports over 400 integrations with tools like Google Sheets, Slack, and OpenAI, and offers flexibility for both no-code visual building and custom JavaScript/Python coding for advanced tasks.

# Forward Proxy

A forward proxy is a server that sits between a client (e.g., a user's device) and the internet, acting as an intermediary to forward client requests to external servers and return the responses. It’s typically used to enhance privacy, security, or control access.

# Reverse Proxy

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

## Polly

## Circuit Breaker

## Caching

## Rate Limiting

Rate limiting restricts the number of requests a client can make to a server within a defined period (e.g., per second, minute, or hour). If the limit is exceeded, the server may reject additional requests, return an error (e.g., HTTP 429 Too Many Requests), or delay processing until the rate limit resets.

### Token Bucket

The **token bucket** algorithm is a widely used method for rate limiting, controlling the rate at which requests or actions are processed in a system. It’s simple, efficient, and allows for bursty traffic while enforcing an average rate limit over time. Below, I’ll explain the token bucket algorithm, how it works, its advantages, use cases, and a basic implementation example.**How the Token Bucket Algorithm Works***Concept**: Imagine a bucket that holds tokens, where each token represents permission to process a request (e.g., an API call, network packet, etc.).

* **Key Parameters**:
  * **Bucket Capacity**: The maximum number of tokens the bucket can hold, determining the maximum burst size.
  * **Token Rate**: The rate at which tokens are added to the bucket (e.g., 10 tokens per second).
  * **Request Cost**: Each request consumes a fixed number of tokens (usually 1).
* **Process**:
  1. **Tokens are added to the bucket at a constant rate (e.g., 10 tokens/second).**
  2. **When a request arrives, it checks if there are enough tokens in the bucket.**
     * **If sufficient tokens are available, the request consumes the required tokens and is processed.**
     * **If not, the request is rejected (hard limit) or queued (soft limit).**
  3. **If the bucket is full, additional tokens are discarded (no overflow).**
* **Burst Handling**: The bucket allows bursts up to its capacity, enabling short-term high request rates as long as tokens are available, but enforces the average rate over time.

### Leacky Bucket

The **leaky bucket** algorithm is a rate-limiting technique used to control the rate at which requests, data packets, or events are processed in a system. It ensures a steady output rate, smoothing out bursts of traffic, and is commonly used in networking, task scheduling, and API management. Below, I’ll explain how it works, its mechanics, advantages, use cases, and how it differs from the token bucket algorithm, along with a simple implementation.**How the Leaky Bucket Algorithm Works***Concept**: Imagine a bucket with a hole at the bottom, leaking water (requests) at a constant rate. Incoming requests fill the bucket, but they are processed (leaked) at a fixed rate, regardless of how fast they arrive.

* **Key Parameters**:
  * **Bucket Capacity**: The maximum number of requests the bucket can hold.
  * **Leak Rate**: The constant rate at which requests are processed (e.g., 10 requests per second).
* **Process**:
  1. **Incoming requests are added to the bucket if there’s space.**
  2. **If the bucket is full, new requests are rejected (hard limit) or queued externally (soft limit).**
  3. **Requests are processed (leaked) from the bucket at a constant rate, regardless of the arrival rate.**
  4. **The bucket ensures a smooth, steady output, preventing bursts from overwhelming the system.**
* **Key Feature**: Unlike the token bucket, which allows bursts up to a capacity, the leaky bucket enforces a constant output rate, making it ideal for systems requiring predictable throughput.

Example* **Bucket capacity: 50 requests.**

* **Leak rate: 10 requests/second.**
* **If 100 requests arrive at once:**
  * **The bucket accepts up to 50 requests; the remaining 50 are rejected or queued externally.**
  * **The bucket processes 10 requests/second, regardless of the input burst.**
  * **After 5 seconds, the bucket is empty, and new requests can be added.**

Advantages* **Smooth Output**: Ensures a constant processing rate, preventing system overload from bursts.

* **Predictability**: Ideal for systems requiring consistent throughput (e.g., network traffic shaping).
* **Simplicity**: Easy to implement with a queue and a fixed-rate processor.
* **Resource Protection**: Prevents downstream systems from being overwhelmed by sudden spikes.

Disadvantages* **No Burst Support**: Unlike the token bucket, it doesn’t allow bursts, which may delay legitimate high-rate requests.

* **Queue Management**: If the bucket fills frequently, rejected requests or external queuing can degrade user experience.
* **Latency**: Requests may wait in the bucket, increasing latency for bursty traffic.

## API Gateway

An **API Gateway** is a server or service that acts as an intermediary between clients (e.g., web or mobile applications) and backend services (e.g., microservices, databases, or APIs). It serves as a single entry point for managing, routing, and processing API requests, simplifying communication in complex systems, especially in **microservices architectures**. Here's a concise explanation of its key aspects:**What Does an API Gateway Do?1. **Request Routing**: Receives client requests and directs them to the appropriate backend service based on the request's URL, headers, or other criteria.

1. **Aggregation**: Combines data from multiple services into a single response to reduce client-server round trips, improving efficiency.
2. **Security**: Enforces authentication (e.g., API keys, OAuth, JWT) and authorization to ensure only valid users access resources. It can also protect against threats like DDoS attacks.
3. **Rate Limiting & Throttling**: Controls the number of requests a client can make to prevent overuse and ensure fair resource usage.
4. **Protocol Translation**: Converts requests between different protocols (e.g., HTTP to gRPC) to enable communication between diverse systems.
5. **Caching**: Stores frequently requested data to reduce latency and server load.
6. **Monitoring & Analytics**: Logs requests, responses, and errors for performance tracking and debugging.
7. **Load Balancing**: Distributes traffic across multiple service instances to ensure scalability and high availability.

## Load Balancer

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

# What are DRY, YAGNI, KISS principles ?

DRY- Do not repeat yourself.
Avoid duplication. Makes the software more maintainable and less error-prone.

YAGNI - You are not going to need it.
Avoid unnecessary features/functionalities to the software. This helps software focussed on essential requirements and makes it more maintainable.

KISS: Keep the implementation simple,stupid.
Keeping the software design and implementation as simple as possible.
This make software more understandable,maintainable and testable.

## Facade Design Pattern

The Facade Design Pattern is a structural pattern that provides a simplified interface to a complex system of classes, libraries, or frameworks. The primary goal of the Facade pattern is to present a clear, simplified, and minimized interface to the external clients while delegating all the complex underlying operations to the appropriate classes within the system. The Facade (usually a wrapper) class sits on the top of a group of subsystems and allows them to communicate in a unified manner.

As the name suggests, Facade means the Face of the Building. Suppose you created one building. The people walking outside the building can only see the walls and glass of the Building. The People do not know anything about the wiring, the pipes, the interiors, and other complexities inside the building. That means the Facade hides all the complexities of the building and displays a friendly face to people walking outside the building.

##### Understanding Facade Design Pattern in C# with one Real-Time Example:

* Identify Complex Subsystems: First, identify the complex parts of your system that need simplification. These could be complex libraries or systems with multiple interacting classes.
* Create a Facade Class: Design a facade class that provides a simple interface to the complex subsystems.
* Delegate Calls to Subsystems: The facade should delegate the client requests to the appropriate objects within the subsystem. The facade should handle all the intricacies and dependencies of the subsystems.
* Client Code Interaction: The client interacts with the system through the facade, simplifying its use of the complex subsystems.

## SAGA Pattern

The Saga pattern is a distributed systems design pattern used to manage long-running, complex transactions across multiple microservices without relying on a centralized transaction manager. It breaks down a transaction into a series of local, independent steps, each executed by a microservice, with compensating actions defined to handle failures. This ensures eventual consistency in a system where traditional ACID transactions are impractical.**Key Concepts1. **Saga**: A sequence of local transactions, each managed by a single microservice. Each step updates its own data and triggers the next step, often via asynchronous messaging or events.

1. **Compensating Transaction**: If a step fails, the saga executes compensating transactions (undo operations) for all previously completed steps to roll back changes.
2. **Eventual Consistency**: Sagas prioritize availability and partition tolerance (per the CAP theorem) over immediate consistency, ensuring the system eventually reaches a consistent state.

Types of Saga Patterns

**1. Choreography**:

* **Microservices communicate via events (e.g., through a message broker like Kafka or RabbitMQ).**
* **Each service listens for events, performs its local transaction, and emits new events to trigger the next service.**
* **Pros: Decentralized, loosely coupled, scalable.**
* **Cons: Harder to track the flow, debugging can be complex.**
* **Example: An e-commerce order process where the Order Service creates an order, emits an "OrderCreated" event, the Payment Service processes payment, emits a "PaymentProcessed" event, and so on.**

1. **Orchestration**:

* **A central orchestrator (a dedicated service or component) coordinates the saga by explicitly instructing each microservice to perform its local transaction.**
* **Pros: Easier to understand, monitor, and debug; clearer control flow.**
* **Cons: Introduces a single point of coordination, which can become a bottleneck.**
* **Example: A saga orchestrator directing the Order Service to create an order, then the Payment Service to process payment, and finally the Inventory Service to reserve items.**

### Database per service pattern

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

## Adaptor Pattern

## Strangler Pattern

The Strangler Pattern (or Strangler Fig Pattern) is a software engineering approach used to incrementally replace an existing system (often a legacy system) with a new one. Instead of a complete, high-risk rewrite, the pattern involves gradually building new functionality around the edges of the old system, slowly "strangling" it until the legacy system is fully replaced or significantly reduced.

## CAP theorem

## HLD and LLD

* **HLD sets the foundation by defining the system's structure and major components.**
* **LLD builds on HLD, breaking down each component into actionable implementation details.**
* **HLD ensures the system aligns with business goals; LLD ensures the system can be coded efficiently.**

Example in Context**For a ride-sharing app:*** **HLD**: Outlines components like user app, driver app, backend services (matching, routing), and database. It describes how the app communicates with the backend via APIs and uses a geolocation service.

* **LLD**: Details the matching algorithm (e.g., logic to pair riders with drivers), database schema for user data, and specific API endpoints like **/requestRide** with request/response formats.

## Distributed locking system

## Apache Kafka

## Zookeeper

## Pub/Sub System

## CDN

A Content Delivery Network (CDN) is a geographically distributed network of servers that cache and deliver content to users from locations closest to them. The goal is to enhance the speed, reliability, and availability of content delivery while reducing latency and network congestion. CDNs store copies of static content (e.g., videos, images, web pages) on edge servers located at Internet Exchange Points (IXPs) or within Internet Service Provider (ISP) networks. By serving content from nearby servers, CDNs minimize the distance data travels, improving load times and user experience. They also reduce bandwidth costs, enhance redundancy, and provide security benefits like DDoS mitigation

## Event Sourcing

Event sourcing is a design pattern in software engineering where an application's state is derived by storing and replaying a sequence of events, rather than storing the current state directly. Each event represents a state change, capturing what happened, when, and why. These events are stored in an event log, which serves as the single source of truth.**Key Concepts:1. **Events as the Source of Truth**: Instead of updating a database with the current state (e.g., updating a user's balance in a table), you append immutable events (e.g., "UserDepositedMoney: $100") to an event store.

1. **Rebuilding State**: The application's current state is computed by replaying all relevant events in order. For example, to determine a user's account balance, you sum all deposit and withdrawal events.
2. **Immutability**: Events are never modified or deleted; they are appended to the log, ensuring a complete audit trail.
3. **Event Store**: A specialized database or log that stores the sequence of events, optimized for appending and retrieving events.

## ElasticSearch

## AutoScaling

## WebSocket

## Vertical Scaling and Horizontal Scaling

Vertical Scaling and Horizontal Scaling are two approaches to improving the performance and capacity of a system, particularly in the context of computing, databases, or application infrastructure. Here's a concise explanation of each:Vertical Scaling (Scaling Up)* Definition: Increasing the capacity of a single server or machine by adding more resources, such as CPU, RAM, storage, or processing power.

* How it works: You upgrade the existing hardware or replace it with a more powerful machine to handle increased load.
* Examples:
  * Adding more RAM to a database server.
  * Upgrading to a faster CPU or increasing disk space on a single machine.
* Advantages:
  * Simpler to implement, as it typically requires no changes to the application architecture.
  * Lower latency since all resources are on a single machine.
  * Often easier to manage for smaller systems.
* Disadvantages:
  * Limited by the maximum capacity of a single machine (hardware constraints).
  * Can be expensive, as high-end hardware costs grow exponentially.
  * Single point of failure; if the machine goes down, the entire system is affected.
  * Scaling has a ceiling (e.g., you can’t infinitely add RAM or CPU).

Horizontal Scaling (Scaling Out)* Definition: Increasing system capacity by adding more machines or nodes to distribute the workload across multiple servers.

* How it works: You add more servers to a cluster, and the workload is balanced across them, often using load balancers or distributed systems.
* Examples:

  * Adding more web servers to handle increased traffic.
  * Distributing database queries across multiple nodes in a cluster (e.g., sharding or replication).
* Advantages:

  * Virtually limitless scaling, as you can keep adding more machines.
  * Improved fault tolerance; if one node fails, others can take over.
  * Often more cost-effective, as it uses commodity hardware.
  * Better suited for distributed systems and cloud environments.
* Disadvantages:

  * More complex to implement, as it requires changes to application architecture (e.g., load balancing, data consistency).
  * Potential for increased latency due to network communication between nodes.
  * Managing distributed systems can be challenging (e.g., ensuring data consistency, handling node failures).

  When to Use*

  Vertical Scaling: Best for applications with moderate growth, simpler architectures, or when quick scaling is needed without redesigning the system. Example: Legacy systems or small-scale databases.

  * Horizontal Scaling: Ideal for modern, cloud-native applications, high-traffic systems, or when fault tolerance and massive scalability are critical. Example: Web applications, microservices, or big data systems.

  Real-World Context*

  Vertical Scaling: Upgrading a single AWS EC2 instance from a t2.micro to a t2.large.

  Horizontal Scaling: Adding more nodes to a Kubernetes cluster or using a NoSQL database like MongoDB with sharding.

## Blue Green Deployment

## Service Discovery

## Database Sharding

Sharding is typically used to address challenges in large-scale systems, such as:

1. **Scalability**: As data grows, a single database server may struggle to handle increased traffic or storage. Sharding allows you to scale horizontally by adding more servers.
2. **Performance**: Queries run faster on smaller datasets, as each shard processes only a subset of the data.
3. **Availability**: Distributing data across multiple servers reduces the risk of a single point of failure.
4. **Geographic Distribution**: Shards can be placed closer to users in different regions, reducing latency (e.g., one shard in the US, another in Europe).

How Sharding Works1. **Sharding Key**: A specific attribute (e.g., user ID, location, or timestamp) is chosen to determine how data is distributed across shards. This is also called the **partition key**.

* **Example: For a social media app, you might shard by **user_id**, so all data for a specific user resides in one shard.**
