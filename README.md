# Open Telemetry

Notes on Open Telemetry from [Official Documentation](https://opentelemetry.io/docs/)

- [Cloud Native Computing Foundation (CCNF)](https://www.cncf.io/) project.
- Solves the problem of Application and Infrastrure Observability in a Cloud-first, microservice architecture with increasingly complex business requirements.

---

## Fundamentals

### OpenTelemetry Protocol (OLTP)

For detailed explaination and further knowledge, Ref: [OLTP Specification 1.5.0](https://opentelemetry.io/docs/specs/otlp/)

- It is a general-purpose telemetry data delivery protocol designed in the scope of the OpenTelemetry project.
- It defines the encoding of telemetry data and the protocol used to exchange data between the client and the server.
- It is implemented over **gRPC** and **HTTP** transport and specifies _Protocol Buffers Schema_ that is used for the payloads.
- It is supported by all OpenTelemetry SDKs.

OLTP specification describes the:

- **encoding**,
- **transport**, and
- **delivery mechanism**

of telemetry data between:

- telemetry sources,
- intermediate nodes such as collectors, and
- telemetry backends.

### Signals

- Signals are system outputs that describe the underlying activity of the operating system and applications running on a platform.
- A signal can be something we want to measure at a specific point in time, like temperature or memory usage, or an event that goes through the components of our distributed system that we'd like to trace.

#### Traces

The path of a request through our application.

Traces give us the big picture of what happens when a request is made to an application. Whether the application is:

- monolith with a single database, or
- sophisticated mesh of services

Traces are essential to understanding the full "path" a request takes in our application.

##### Spans

[More on Spans](https://opentelemetry.io/docs/concepts/signals/traces/#spans)

It represents a **unit of work or operation**. These are the building blocks of Traces.

Let us take a look at what is called a _span_:

```json
{
  "name": "/v1/sys/health",
  "context": {
    "trace_id": "7bba9f33312b3dbb8b2c2c62bb7abe2d",
    "span_id": "086e83747d0e381e"
  },
  "parent_id": "",
  "start_time": "2021-10-22 16:04:01.209458162 +0000 UTC",
  "end_time": "2021-10-22 16:04:01.209514132 +0000 UTC",
  "status_code": "STATUS_CODE_OK",
  "status_message": "",
  "attributes": {
    "http.method": "GET",
    "http.target": "/v1/sys/health",
    "http.server_name": "mortar-gateway",
    "http.route": "/v1/sys/health",
    "http.user_agent": "Consul Health Check",
    "http.scheme": "http",
    "http.host": "10.177.2.152:26040",
    "http.flavor": "1.1"
  },
  "events": [
    {
      "name": "",
      "message": "OK",
      "timestamp": "2021-10-22 16:04:01.209512872 +0000 UTC"
    }
  ]
}
```

Here two properties are very important:

- `parent_id`
- `trace_id`

Here, if we look closer, `parent_id` is empty (or null in some cases) which means this is the root span, which denotes the beginning and end of the entire operation.

For any trace whose `parent_id` is not null and matches with the `context.span_id` of this span then that trace will be a child of this span (also it will have the same `trace_id`). Any such trace which has the same `parent_id` and same `trace_id` then it will be a sibling.

Also, `events` denote a structured log message, which is typically used to denote a meaningful singular point in time during the Span's duration.

So, all such blocks of JSON depening on the value of `trace_id` and `parent_id` will represent a hierarchy for that request. This makes a Trace!

##### Tracer Provider

- It is factory for Tracer's.
- It is like an SDK, a plug-and-play feature, which we can integrate within our application.
- It's initialization happens at the same time as that of the application.

##### Tracer

A tracer is the one who actually creates the _span_ thereby giving more information about a request in a system.

##### Trace Exporters

Their role is to send generated traces to consumers.

##### Context Propagation

[More on Context Propagation](https://opentelemetry.io/docs/concepts/context-propagation/)

- It is the core concept that enables **Distributed Tracing**.
- Key process where multiple spans (accross distributed systems) can be correlated with each other and assembled into a trace, regardless of where they are created.

#### Metrics

- A measurement of a service captured at runtime.
- A **mertic event** is the moment of capturing a measurements which, in addtion to the measurement will also include the associated metadata.
- Application and Request metrics are important indicators of availability and performance.
- Such collected data can be used to:
  - alert of an outage, or
  - trigger scheduling decisions to **scale up** a deployment automatically upon high demand.

Unlike **Traces**, which is intended to capture request lifecycles and provide context to the indivisual pieces of request, **metrics are intended to provide statistical information in aggregate**.

Some examples of use cases for metrics include:

- Reporting the total number of bytes read by a service, per protocol type.
- Reporting the total number of bytes read and the bytes per request.
- Reporting the duration of a system call.
- Reporting CPU or memory usage of a process.
- Reporting average balance values from an account.
- Reporting current active requests being handled.

##### Meter Provider

- It is a factory for Meter's.
- It is initialized at the same time as the underlying application.

##### Meter

Meter creates _metric instruments_ which captures measurements about a service at runtime.

##### Metric Exporter

Sends metric data to a consumer.

##### Metric Instruments

A metric instrument is defined by:

- Name
- Kind
- Unit (optional)
- Description (optional)

Here, _name_, _unit_ and _description_ are chosen by the developer or defined via [semantic conventions](https://opentelemetry.io/docs/specs/semconv/general/metrics/).

_kind_ is one of the following:

- **Counter**: Any incremental value like the number of hits for an API.
- **Asynchronous Counter**: Same as the **Counter** but collected once for each export.
- **UpDownCounter**: Any value that can increment or decrement over time. Like the number of bytes under usage.
- **Asynchronous UpDownCounter**: Same as the **Asynchronous UpDownCounter** but collected once for each export.
- **Gauge**: Measures the current value the current time instant.
- **Asynchronous Gauge**: Same as the **Gauge** but is collected once for each export.
- **Histogram**: A 2D plot of values against a range of units of measurement e.g. How many requests take fewer than 1s ?

##### Aggregation

- It is a technique whereby a large number of measurements are combined into either exact or eistimated statistics about metric events that took place during a time window.
- The OpenTelemetry API provides a default aggregation for each instrument which can be overridden using the **Views**.

##### Views

- A view provides _SDK users_ with the flexibility to customize the metrics output by the SDK.
- We can customize which metric instruments are to be processed or ignored.
- We can also customize aggregation and what attributes we want to report on metrics.

#### Logs

A log is a timestamped text record, either structured (recommended) or unstructured, with optional metadata.

- OpenTelemetry logs are the existing logs that we already have from a logging framework or infrastructure component.
- OpenTelemetry SDKs and autoinstrumentation utilize several components to automatically correlate logs with traces.
- OpenTelemetry's support for logs is designed to be fully compatible with what we already have, providing capabilities to wrap those logs with additional context and a common toolkit to parse and manipulate logs into a common format accross different sources.
- OpenTelemetry has the ability to automatically correlate our logs and traces.
- Stuctured Logs (JSON format) is always the recommended way.

##### [OpenTelemetry Collector](https://opentelemetry.io/docs/collector)

Provides several tools to work with the logs:

- Several receivers which parse logs from specific, known sources of log data.
- The `filelogreceiver`, which reads logs from any file and provides features to parse them from different formats or use a regular expression.
- Processors like `transformprocessor` which lets us parse nested data, flatten nested structures, add/remove/update values, and more.
- Exporters that lets us emit log data into non-OpenTelemetry format.

##### Log Appender (or Log Bridge)

- As a Developer, we should not use this directly.
- We need to configure our language supported logging library to use a log appender (or log bridge) that is able to emit logs to an OpenTelemetry LogRecordExporter.

##### Logger Provider

- Factory of Loggers
- It is initialized once at the application initialization time and will stay upto the lifetime of the application.

##### Logger

- Creates log records.

##### Log Record Exporter

- Sends log records to the customers.

##### Log Record

Contains the recording of an event. In OpenTelemetry, it will contain two kinds of fields:

- Named top-level fields of specific type and meaning.
- Resource and attributes fields of arbitary value and type.

Few top-level fields are stated below:

- Timestamp
- TraceId
- SpanId
- Body
- Resource
- Attributes

#### Baggage

- Contextual information that is passed between signals.
- It is basically a key-value store, which lets us propagate any data we want alonside context.
- Helps us pass data accross services and processes, making it available to add to traces, metrics, or logs in those services.

For example, imagine we have a `clientId` at the start of a request, but we want that ID to be available across all spans in a trace (across services) but we would like to propagate this data without copying `clientId` across many places in our codebase.

When we use **context propagation** to pass baggage accross these services, the `clientId` is available to add to any additional spans, metrics, or logs.

##### What should OTel baggage be used for ?

Baggage is best used to include information typically available only at the start of a request further downstream. This can include things like Account Identification, User IDs, Product IDs, and origin IPs etc.

Propagating such information allows for a deeper analysis of telemetry in a backend.

For example, if we include information like a User ID on a span that tracks a database call, we can much more easily answer questions like _Which users are experiencing the slowest database calls?_.

##### Baggage Security Considerations

- All information of a baggage are typically sent in HTTP Headers which makes it visible to anyone inspecting our network traffic.
- Additionally, Any downstream services could propagate baggage outside the network.
- There are no built-in integrity checks to ensure that Baggage items are ours, so we should exercise caution when reading them.

##### Baggage v/s Attributes

- A baggage is a separate key-value store and is not associated with attributes on spans, metrics, or logs.
- We need to **explicitly read the data from baggage** and add it as attributes to our spans, metrics, or logs.

---

## Observability

- Observability lets us understand a system from the outside by letting us ask questions about that system without knowing its inner workings.
- It basically helps us with troubleshooting thereby helping us answer such questions as:
  - Why is this happening?
  - Why is memory usage too high?

To answer such questions about our system, our application must be properly implemented.

### Instrumented Application

An application is said to be properly instrumented when developers don't need to add more instrumentation to troubleshoot an issue, because they have all of the information they need. Such application must emit signals such as:

- traces
- metrics
- logs

> OpenTelemetry is the mechanism by which an application code is instrumented to help make a system obervable.

### Key Terminologies

| Terminology                   | Description                                                                                                                                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Telemetry                     | It refers to the data emitted from a system and its behavior (i.e. traces).                                                                                                              |
| Reliability                   | A system could be up 100% of the time, but if, a user does an action: "Add to Cart" but the system doesn't always does the expected, then it means that the system could be unrealiable. |
| Metrics                       | Aggregations over a period of time. e.g. no. of bytes of memory utilized in a given time frame.                                                                                          |
| Service Level Indicator (SLI) | It measures the service from the perspective of the users. e.g. It could be the speed at which the page loads.                                                                           |
| Service Level Objective (SLO) | It represents the means by which reliability is communicated to an organization/other teams.                                                                                             |

### [Distributed Tracing](https://opentelemetry.io/docs/concepts/observability-primer/#distributed-traces)

- Helps us observe requests as they propagate through complex, distributed systems.
- Helps us debug a behavior that is difficult to reproduce locally.
- Many observability backends visualize traces as **waterfall diagrams**.

---

## Why OpenTelemetry ?

With the rise of cloud computing, microservices architecture, and increasingly complex business requirements, the need of software and infrastructure observability is greater than ever.

OpenTelemetry satisfies the need for observability, while following two key principles:

- We own the data that we generate. There's no vendor lock-in.
- We only have to learn a single set of APIs and conventions.

OpenTelemetry is designed to be extensible. Some examples of how it can be extended include:

- Adding a receiver to the OpenTelemetry Collector to support telemetry data from a custom source.
- Loading custom instrumentation libraries into an SDK.
- Creating a distribution of an SDK or the Collector tailored to a specific use case.
- Creating a new exporter for a custom backend that doesn't yet support the OpenTelemetry protocol (OLTP).
- Creating a custom propagator for a nonstandard context propgation format.

Whether our goal is to get observability by writing code or we want to have our dependencies emit telemetry for us automatically, OpenTelemetry is one-stop-solution.

---

## How to add instrumentation to my codebase ?

### 1. Import the OpenTelemetry API and SDK

- If we're developing a library or some other component that is intended to be consumed by a runnable binary, then we should only take the dependency on the API.
- If we're developing a standalone process or service, then we should take the dependency on both the API and SDK.

#### Configure the OpenTelemetry API

In order to create traces or metrics:

- First, we'll need to first create a tracer and/or meter provider.
  - It is recommended that the SDK should provide a single default provider for these objects.
- We'll then get a tracer or a meter instance from that provider, and give it a name or version.
  - The name chosen here should semantically identify what is being instrumented.
  - We should follow standard naming conventions. For example, if developing a library (say `myLibrary`), we should name it after our library (`com.example.myLibrary`) as this name will namespace all spans or metric events produced.
  - We should also supply a version string (e.g. `myService:1.0.0`) that corresponds to the current version of our library or service.

#### Configure the OpenTelemetry SDK

If we're building a **service process**,

- We should also need to configure the SDK.
- This configuration process should include appropriate options for exporting our telemetry data to some analysis backend.

- It is recommeded that this configuration be handled programmatically through a configuration file.
- We may take advantage of per-language tuning options.

### 2. Create Telemetry Data

Here, we make use of the Instrumentation Libraries for our dependencies.

Ref: [Registry](https://opentelemetry.io/ecosystem/registry/)

### 3. Export Data

OpenTelemetry supports **two primary methods** of exporting data from our process to an analysis backend, either:

- directly from a process, or
- by proxying it through the OpenTelemetry Collector.

We should import and take a dependency on one or more exporters, libraries that translate OpenTelemetry's in-memory span and metric objects into the appropriate format for telemetry analysis tools like Jaeger or Prometheus.

The OLTP is used to send this transormed data to the OpenTelemetry Collector. This Collector is configured to forward and export this data to our choice of analysis tools.

---

## How to add native instrumentation to my library ?

---

