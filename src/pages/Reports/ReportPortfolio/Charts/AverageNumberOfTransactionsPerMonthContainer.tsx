import AverageNumberOfTransactionsPerMonth from "components/charts/AverageNumberOfTransactionsPerMonth/AverageNumberOfTransactionsPerMonth";
import SwitchCore from "components/form/SwitchCore/SwitchCore";
import React, { useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";
import "../assets/averageNumberContainer.scss";
interface Props {
  data: any[];
}

export default function AverageNumberOfTransactionsPerMonthContainer({
  data,
}: Props) {
  const [susbGroups, setSubGroups] = useState<{
    0: boolean;
    1: boolean;
    yellowDisplay: boolean;
    blueDisplay: boolean;
  }>({
    0: true,
    1: true,
    yellowDisplay: true,
    blueDisplay: true,
  });
  const handleBlueChange = useCallback(
    (field: number) => (v: boolean) => {
      setSubGroups(prev => {
        return {
          ...prev,
          blueDisplay: v,
          [field]: v,
        };
      });
    },
    []
  );
  const handleYellowChange = useCallback(
    (field: number) => (v: boolean) => {
      setSubGroups(prev => {
        return {
          ...prev,
          yellowDisplay: v,
          [field]: v,
        };
      });
    },
    []
  );

  return (
    <>
      <div className="main-container">
        <div className="header-container d-flex align-items-center justify-content-space-between">
          <div className="mr-8">
            <h4>
              <FormattedMessage
                id="trade-average-in-mounth"
                defaultMessage="trade-average-in-mounth"
              />
            </h4>
          </div>
          <div className="d-flex ml-8">
            <div className="trade-counts">
              <SwitchCore
                value={susbGroups[0]}
                onChange={handleBlueChange(0)}
              />
              <label className="mr-1">
                <FormattedMessage
                  id="trade-number"
                  defaultMessage="trade-number"
                />
              </label>
            </div>
            <div className="instrument-counts">
              <SwitchCore
                value={susbGroups[1]}
                onChange={handleYellowChange(1)}
              />
              <label className="mr-1">
                <FormattedMessage
                  id="instrument-count"
                  defaultMessage="instrument-count"
                />
              </label>
            </div>
          </div>
        </div>
        <AverageNumberOfTransactionsPerMonth
          data={data}
          subGroups={susbGroups}
        />
      </div>
    </>
  );
}
