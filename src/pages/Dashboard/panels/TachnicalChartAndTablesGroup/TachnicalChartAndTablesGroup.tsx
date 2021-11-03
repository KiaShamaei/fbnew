import React, {
  ReactElement,
  useEffect,
  useState /* useEffect, useState*/,
} from "react";
import { IPanelItem } from "container/Layout/meta/types";
import useResizer from "pages/Dashboard/hooks/useResizer";
import { IPanelItemProps } from "pages/Dashboard/meta/types";
import Tables from "../Tables/Tables";
import TechnicalChart from "../TechnicalChart/TechnicalChart";
import "../../assets/Resizer.scss";

interface Props extends IPanelItemProps { }

let finalData:any;
try{
  finalData=JSON.parse(localStorage.getItem("percentHeightTow")?? '')
}catch{
  finalData={}
}
const height=window.innerHeight
const layoutItems: IPanelItem[] = [
  {
    id: "technicalChart",
    height:     finalData.technicalChart  ? finalData.technicalChart  : (height > 950 ? 50 : 60),
    component: TechnicalChart,
  },
  {
    id: "statusTables",
    height: finalData.statusTables  ? (100-finalData.technicalChart)  : (height > 950 ? 50 : 40),
    component: Tables,
  },
];

function TachnicalChartAndTablesGroup({
  height,
  width: widthInput,
}: Props): ReactElement {
  const { onMouseDown, panelsWidthSize, recalculatePanels, topPos } =
    useResizer({
      height,
      minWidth: 30,
      maxWidth: 50,
      width: widthInput,
      direction: "vertical",
      layoutItems,
      onMouseUp: () => {
        setWidth(widthInput)
        // localStorage.setItem('widthDatatow',JSON.stringify(widthInput) );
    }
    });

  const [width, setWidth] = useState(widthInput);

  useEffect(() => {
    recalculatePanels(widthInput, height);
    setWidth(widthInput);
  }, [height, recalculatePanels, widthInput]);

  return (
    <div>
      {panelsWidthSize.map((item, index) => {
        const id = item.id;
        const top = topPos.current;
        topPos.current += item.heightInPixel || 0;
        return (
          <div
            key={id}
            style={{
              top,
              width: width,
              height: item.heightInPixel,
              position: "absolute",
            }}
            className="panel-group">
            <div className="panel" style={{ backgroundColor: "transparent" }}>
              <item.component
                height={item.heightInPixel || 0}
                width={(width || 0) + 5}></item.component>
            </div>
            <div
              className="vertical-resizer"
              onMouseDown={e => onMouseDown(e, index)}></div>
          </div>
        );
      })}
    </div>
  );
}

export default TachnicalChartAndTablesGroup;
