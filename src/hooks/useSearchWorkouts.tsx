import { useState } from "react";

function useSearchWorkouts() {
  const [activeCard, setActiveCard] = useState(0);

  const changeActiveCard = (index: number) => setActiveCard(index);

  return {
    activeCard,
    changeActiveCard,
  };
}

export { useSearchWorkouts };
