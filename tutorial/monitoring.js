'use strict'

const { MeterProvider } = require("@opentelemetry/sdk-metrics")
const { Resource } = require('@opentelemetry/resources')
const { PrometheusExporter } = require("@opentelemetry/exporter-prometheus")
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

// Configure the Prometheus Exporter
const prometheusExporter = new PrometheusExporter(
    {
        port: 9464
    },
    () => console.log('Prometheus scrape endpoing: http://localhost:9464/metrics')
)

// Set up the MeterProvider with the Prometheus Exporter
const meterProvider = new MeterProvider({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'opentelemetry-tutorial'
    })
})

// Correct binding for meter-provider
meterProvider.addMetricReader(prometheusExporter);

// Create a Meter
const meter = meterProvider.getMeter('my-meter');

// Create and record a Counter metric
const requestCounter = meter.createCounter('requests', {
    description: 'Counts the number of requests received',
})

console.log('Prometheus Exporter Configured!')

module.exports = {
    requestCounter
}
