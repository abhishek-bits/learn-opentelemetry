# Open Telemetry

Ref: [YouTube Tutorial](https://www.youtube.com/watch?v=r8UvWSX3KA8)

A standardization for describing what distributed systems are doing.

Today, the OpenTelemetry project can be described as a collection of Tools, APIs and SDKs used to:

- Instrument
- Generate
- Collect
- Export

telemetry data so that we can analyze it later on with whatever platform we wish.

## Table of Contents

| #   | Title                    |
| --- | ------------------------ |
| 1.  | What are Microservices   |
| 2.  | What is Observability    |
| 3.  | M.E.L.T                  |
| 4.  | History of OpenTelemetry |
| 5.  | Setting up our Project   |
| 6.  | Tracing                  |
| 7.  | Distributed Tracing      |
| 8.  | Context and Propagation  |
| 9.  | Metrics                  |
| 10. | Distributed Project      |
| 11. | Next Steps               |

> Netflix, at its peak, consumes 37% of Internet's bandwidth in the USA, So, what makes such tech organizations process 400bn events daily, 17GB/sec at its peak, when thousands of user click play button at the same time with 0% loss ?

## What are Microservices

Monolith application are a fair choice to initiate software development but as long as the application progresses and new features are added, it becomes hard for indivisuals to know the entirety of this single code-base. This becomes a bigger problem when multiple teams work on the same code-base and simultaneously change the same section of code. It gradually becomes harder and harder for indivisual developers to make changes without knowing its impact on other teams. This results in slower development, and less reliable applications.

The main advantage of Microservice Architecture is that they are easy to build and simple to maintain. Here, we isolate software applications into multiple independent modules. Such modules will contribute through APIs with each such module manage by its own specific team thereby delegating the responsibility for building highly scalable application.

## What is Observability

Trying to achieve visibility in a Microservices Architecture can be very difficult. When we have a request going through a 100s of different services, debugging and troubleshooting can be a nightmare.

This is where OpenTelemetry comes in.

| Telemetry                                                                                                                                                | Observability                                                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| It is defined as the science of progress of collecting information about objects that are far away and sending the information somewhere electronically. | It means, how well we can understand what is going on internally in a system based on its outputs, especially as system becomes more distributed and complex. |

## M.E.L.T

**M**etrics, **E**vents, **L**ogs and **T**races.

| Terminology | Description                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Metrics     | Measurements collected at regular intervals that have a **timestamp**, a **name**, one or more **numeric values**, and a **count** of how many events are represented, which may include error rate, response time, or output.                                                                                                                                                                      |
| Event       | - It is a discrete action happening at any moment in time.<br>- For example, a user initiating a payment on an eCommerce platform.<br>- With additional metadata, events bring out really useful information such as: _What is the most ordered item ?_                                                                                                                                             |
| Logs        | They come directly from the app, exporting detailed data and detailed context around an event.                                                                                                                                                                                                                                                                                                      |
| Traces      | - They follow a request, starting from the initial request to the returned output.<br>- They record the casual chain of events to **determine relationships between different entities**.<br>- They are very valuable for highlighting inefficiencies, bottlenecks, and roadblocks in the user experience.<br>- They showcase end-to-end latency of indivisual cores in a distributed architecture. |

However, getting that data is very difficult. We will have to manually instrument every single service one by one layer by layer. This will take as much time as writing the code itself which is annoying.

## History

| Project      | Release                                                                 | Benefits                                                                                                                                                                                 | Limits                                                                                                        |
| ------------ | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Open Tracing | Released in 2016 as CNCF project with focus around distributed tracing. | - The libraries were lightweight and simple and they could fit any use case.<br>- Made it easier to instrument data.                                                                     | Made it hard to instrument software that was shipped as binaries without a lot of manual engineering work.    |
| Open Census  | Released in 2018, open sourced out of Google.                           | - Supported both the capturing of retracing permission and metrics.<br>- Made it easierr to get telemetry data from software that was shipped as binaries like Kubernetes and databases. | Made it hard to use the API to implement custom instrumentations which were not part of the default use-case. |

Both projects were able to make Observability easy for modern applications and eventually adopted heavily for distributed tracing by the software industry. However, developers had to choose between the two options with pros and cons.

It turns out that the approaches of these two projects were complimentary (rather than contradictory). There was no reason why we couldn't have both the abstract vendor natural API and a well supported default implementation.

In late 2019, the two projects were merged to form Open Telemetry. This brought forth the idea of having a single standard for observability instead of two competing standards.

## NodeJs Project Setup

Zipkin Docker Installation

> Zipkin is a distributed tracing system that helps gether timing data that is used to troubleshoot latency problems in service architectures. It was originally created by Twitter and is currently run by the Open-Zipkin volunteer organization.

```shell
docker pull openzipkin/zipkin
```

```shell
docker run --name zipkin -d -p 9411:9411 openzipkin/zipkin
```

Setting Up OpenTelemetry Libraries

```shell
npm install @opentelemetry/api @opentelemetry/sdk-node @opentelemetry/sdk-trace-node @opentelemetry/exporter-zipkin @opentelemetry/instrumentation-http @opentelemetry/instrumentation-express express
```

## Distributed Tracing

In Software Engineering, tracing involves a specialized use of logging to record information about programs execution. This information is typically used by programmers to debug by using the information contained in a trace log to troubleshoot any problem that might arise with a particular software or app.

Distributed Tracing is a method used to debug and monitor applications built using a microservice architecture. Helps pin-point any failures occurred or what causes poor performance.

Being able to get tracing data telemetry is pretty important to the oveall performance of an app.

OpenTelemetry:

- helps in distributed tracing by finding a common set of APIs, SDKs, and wired protocols.
- gives organizations a single, well supported integration service for end-to-end distributed tracing telemetry.

In general, once the traces are implemented into applications they are set to record timing and metadata about operations that take place.

As an example, a service records the in-time of a request and the time at which the response was sent. Such an information is referred to as a _Span_. Spans share inherent relationships with each other. In a tracing tool, Spans are represented as horizontal bars. This helps us identify _latencies_ which are key indicators to the performance of an application.

## Context and Propagation

These terminologies help us learn distributed tracing a lot better.

The components in a distributed system should be able to:

- collect,
- store, and
- transfer

metadata.

We refer to this metadata as **Cotext**.

### Context

It is divided into two types:

#### Span Context

Represents the data required for moving trace accross service boundaries. It contains the following metadata:

- Trace ID
- Span ID
- Trace Flags
- Trace State

#### Correlation Context

Carries user-defined properties, such as:

- Customer ID
- Host name
- Region

and other telemetry that gives us application specific performance insights.

It will carry certain information that helps identify the current span and trace.

### Propagation

It is the mechanism using which we will bundle up our context and we'll transfer this bundled information accross services.

Togther, both Context and Propagation represent the engine behind Distributed Tracing.

## Tracing Initialization

All tracing initialization should happen before our application code runs. The easiest way to do this is to initialize tracing in a separate file:

```js
// File name: tracing.js

"use strict";

const { ZipkinExporter } = require("@opentelemetry/exporter-zipkin");
const {
  ExpressInstrumentation,
} = require("@opentelemetry/instrumentation-express");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { NodeSDK } = require("@opentelemetry/sdk-node");

// Initialize the OpenTelemetry SDK
const nodeSDK = new NodeSDK({
  traceExporter: new ZipkinExporter({
    url: "http://localhost:9411/api/v2/spans",
    serviceName: "opentelemetry-tutorial",
  }),
  instrumentations: [new HttpInstrumentation(), new ExpressInstrumentation()],
});

// Start the SDK
nodeSDK.start();
```

then run the application using:

```shell
node -r ./tracing.js app.js
```

## Metrics

Here, we will learn how to collect metrics using OpenTelemetry and Prometheus.

Prometheus is a monitoring platform that collects metrics from monitored targets by scraping metrics, HTTP endpoints on these targets.

Unlike traces which work in spans, metrics are numeric representation of data measured over intervals of time. Metrics can harness the power of mathematical modelling and prediction to derive knowledge on the behavior of a system over intervals of time in the present and future.

Since, numbers are optimized for storage, processing, compression and retrieval, metrics enable longer retention of data as well as easier querying. This makes metrics a perfectly suited tool for building dashboards that reflect historical trends.

Metrics also allow a gradual reduction of data resolution. After a certain period of time, data can be aggregated into daily or weekly frequency.

Now, we will have to instrument our NodeJs application. For this we are going to need the OpenTelemetry metrics package.

```bash
npm install @opentelemetry/sdk-metrics @opentelemetry/api @opentelemetry/resources
```

Now, we'll create a very basic `monitoring.js` file as follows:

```js
"use strict";

const { MeterProvider } = require("@opentelemetry/sdk-metrics");

const meterProvider = new MeterProvider({});

// Create a Meter
const meter = meterProvider.getMeter("my-meter");

// Create and record a Counter metric
const requestCounter = meter.createCounter("requests", {
  description: "Counts the number of requests received",
});

// Simulate metric recording
requestCounter.add(1, { route: "/home", method: "GET" });

console.log("Metrics initialized and recorded");
```

Next, we'll just include our `requestCounter` method in `app.js` file:

```js
const { requestCounter } = require("./monitoring");
```

and alow `express` to use it.

```js
app.use(requestCounter());
```

Perfect! Now, whenever we try to hit our API, it will now automatically be recorded as a metric.

Next, let's look at initializing and registering a metric exporter.

> Counting metrics is only useful if we can export them somewehere where we can see them.

For this, we are going to use Prometheus.

### Integrating Prometheus

Create a prometheus.yml file as follows:

```yml
# my global config
global:
  scrape_interval: 15s # Set the scrape interval to every 15 seconds.

scrape_configs:
  - job_name: "opentelemetry"
    static_configs:
      - targets: ["localhost:9464"] # Endpoint of the Prometheus Exporter
```

Now, we will also integrate Prometheus Exporter within `monitoring.js` file.

```js
"use strict";

const { MeterProvider } = require("@opentelemetry/sdk-metrics");
const { Resource } = require("@opentelemetry/resources");
const { PrometheusExporter } = require("@opentelemetry/exporter-prometheus");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");

// Configure the Prometheus Exporter
const prometheusExporter = new PrometheusExporter({ port: 9464 }, () =>
  console.log("Prometheus scrape endpoing: http://localhost:9464/metrics")
);

// Set up the MeterProvider with the Prometheus Exporter
const meterProvider = new MeterProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "opentelemetry-tutorial",
  }),
  metricReaders: [prometheusExporter], // Pass the exporter here
});

// Create a Meter
const meter = meterProvider.getMeter("my-meter");

// Create and record a Counter metric
const requestCounter = meter.createCounter("requests", {
  description: "Counts the number of requests received",
});

module.exports = {
  requestCounter,
};
```
