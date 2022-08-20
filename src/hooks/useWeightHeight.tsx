import { useState } from "react";

function useWeightHeight() {
  const [activeHeight, setActiveHeight] = useState(175);
  const [activeWeight, setActiveWeight] = useState(70);

  const onChangeHeight = (position: number) => setActiveHeight(position);
  const onChangeWeight = (position: number) => setActiveWeight(position);

  return {
    activeHeight,
    activeWeight,
    onChangeHeight,
    onChangeWeight,
  };
}

export { useWeightHeight };
