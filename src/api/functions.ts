import { WGER_URL } from "./constants";

export async function getExercises(searchQuery: string) {
  const data = await fetch(
    `${WGER_URL}/exerciseinfo?language=2&name=${searchQuery}&limit=3`
  );
  const jsonData = await data.json();
  console.log(jsonData);
}
