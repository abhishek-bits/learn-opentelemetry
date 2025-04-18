'use strict';

const { Resource } = require('@opentelemetry/resources');
const { ZipkinExporter } = require("@opentelemetry/exporter-zipkin");
const { ExpressInstrumentation } = require("@opentelemetry/instrumentation-express");
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { NodeSDK } = require("@opentelemetry/sdk-node");

// Initialize the OpenTelemetry SDK
const nodeSDK = new NodeSDK({
    traceExporter: new ZipkinExporter({
        url: 'http://localhost:9411/api/v2/spans',
    }),
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'opentelemetry-tutorial',
    }),
    instrumentations: [
        new HttpInstrumentation(),
        new ExpressInstrumentation(),
    ],
});

// Start the SDK
nodeSDK.start();
// nodeSDK.start()
//     .then(() => console.log('Tracing Initialized'))
//     .catch((err) => console.error('Error initializing tracing', err));
