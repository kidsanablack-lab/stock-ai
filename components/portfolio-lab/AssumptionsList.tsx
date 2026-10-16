type AssumptionsListProps = {
  variant: "dca" | "lump" | "monthly";
};

/** The assumptions behind every projection, written for beginners. */
export default function AssumptionsList({ variant }: AssumptionsListProps) {
  const hasContributions = variant !== "lump";

  return (
    <div className="pl-assumptions">
      <h3 className="pl-h3">Assumptions behind these numbers</h3>

      <ul>
        <li>
          <strong>Hypothetical returns.</strong> The return is an assumption you
          choose, not a forecast. Real returns rise and fall, and can be
          negative.
        </li>
        <li>
          <strong>Effective annual rate.</strong> A 6% return means a balance
          grows by 6% over 12 months. It is converted to a monthly rate with
          (1 + rate)<sup>1/12</sup> − 1 and applied the same way every month,
          with no market ups and downs.
        </li>
        {hasContributions && (
          <li>
            <strong>Timing.</strong> The first amount is invested at the start.
            Each monthly contribution is added at the end of the month, after
            that month&apos;s growth, so it does not earn a return in the month
            it is added. Contributions never change or stop.
          </li>
        )}
        {!hasContributions && (
          <li>
            <strong>Timing.</strong> The full amount is invested at the start
            and left alone. Growth is added every month.
          </li>
        )}
        <li>
          <strong>What is left out.</strong> Fees, taxes, inflation, trading
          costs, and currency conversion are not included, so real results
          would usually be lower. The amounts use your display currency without
          any conversion.
        </li>
        {variant === "dca" && (
          <li>
            <strong>About DCA.</strong> Investing a fixed amount regularly
            (dollar-cost averaging) does not guarantee a profit and does not
            prevent losses.
          </li>
        )}
      </ul>
    </div>
  );
}
