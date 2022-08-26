import targetMuscles from "context/targetMuscles";
import { useContext, useState } from "react";

function useSearchWorkouts() {
  const [activeCard, setActiveCard] = useState<{
    exerciseCategories: number[];
    id: number;
  }>({ exerciseCategories: [], id: 0 });

  const changeActiveCard = (newCard: {
    exerciseCategories: number[];
    id: number;
  }) => setActiveCard(newCard);

  const { changeProgram } = useContext(targetMuscles);

  const submitChoice = async () => {
    changeProgram(activeCard.exerciseCategories);
  };

  return {
    activeCard,
    changeActiveCard,
    submitChoice,
  };
}

export { useSearchWorkouts };
