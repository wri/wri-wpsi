import React from "react";

export const DataStoryStatsHelpContent = () => {
  return (
    <>
      <p>
        We can quantify the strength of the relationships to the outcome using a
        few key statistics:
      </p>
      <dl>
        <dt className="font-family-heading"> Causal Coefficient </dt>
        <dd>
          <p className="mb-0">
            The strength of the relationship to the outcome
          </p>
          <ul>
            <li>
              A positive value means there is a parallel connection to the
              outcome: the more of that variable, the more of the outcome is
              expected
            </li>
            <li>
              A negative value means there is an inverse connection to the
              outcome: the less of that variable, the more of the outcome is
              expected (or vice-versa)
            </li>
            <li>
              The closer the value is to 0, the weaker the effect on the outcome
            </li>
            <li>
              Inestimable means there are too many or unknown pathways to the
              outcome so the strength of the effect cannot be quantified or the
              distribution of the data is not sufficient for the calculation
            </li>
          </ul>
        </dd>
        <dt className="font-family-heading">Standard Error</dt>
        <dd>
          <p className="mb-0">How reliable the relationship is</p>
          <ul>
            <li>
              Standard error is the standard deviation of the sampling
              distribution. In other words, the higher the standard error, the
              more spread there is in the results, and the less we can have
              confidence in them
            </li>
            <li>The closer the value is to 0 the better</li>
          </ul>
        </dd>
        <dt className="font-family-heading"> Statistical Significance</dt>
        <dd>
          <p className="mb-0">The confidence in the finding</p>
          <ul>
            <li>
              We are only working with a sample of data. We need statistics to
              help us understand how the sample will compare to the population,
              or to all situations, not those just observed in this work.
            </li>
            <li>
              The statistical significance tells us if we can expect to see this
              relationship in the population or if is due to random chance alone
            </li>
            <li>
              The higher the statistical significance, the more confidence that
              we will observe this relationship in reality
            </li>
          </ul>
        </dd>
      </dl>
    </>
  );
};
