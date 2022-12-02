import React from "react";

export const DataStoryModelHelpContent = () => {
  return (
    <dl>
      <dt className="font-family-heading"> Stationary </dt>
      <dd>
        {`This condition implies that, over time, the model's statistical properties do not change over time. This assumption makes the patterns in the model easier to detect, analyze and interpret. You can read more about stationarity in time series analysis `}
        <a href="https://towardsdatascience.com/stationarity-in-time-series-analysis-90c94f27322">
          here
        </a>
        .
        <br />
        <em>
          Limitation: Models do not reflect temporal variation like seasonality
        </em>
      </dd>
      <dt className="font-family-heading">Stochastic</dt>
      <dd>
        The causal trends in the model can be analyzed statistically but are
        random, making its exact prediction impossible.
        <br />
        <em>
          Limitation: We cannot tie the causal model to a specific event, but
          rather the aggregation of many events
        </em>
      </dd>
      <dt className="font-family-heading">Hidden effects</dt>
      <dd>
        {`Armed conflict events are complex and can have causality embedded factors that are impossible to model or we don't have the dataset available to include in the model.  Therefore, some causes are hidden.`}
        <br />
        <em>Limitation: Not all causes are represented in the graph</em>
      </dd>
    </dl>
  );
};
