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

## Project Setup

Zipkin Docker Installation

```shell
docker pull openzipkin/zipkin
```

```shell
docker run --name zipkin -d -p 9411:9411 openzipkin/zipkin
```

Setting Up OpenTelemetry Libraries

```shell
npm i @opentelemetry/core @opentelemetry/node @opentelemetry/plugin-http @opentelemetry/plugin-https @opentelemetry/exporter-zipkin @opentelemetry/tracing @opentelemetry/plugin-express express
```
