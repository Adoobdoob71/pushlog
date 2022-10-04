import { WGER_URL_API } from "./constants";

export async function getExercises(searchQuery: string) {
  const data = await fetch(
    `${WGER_URL_API}/exercise/search?language=2&term=${searchQuery}&limit=5`
  );
  const jsonData = await data.json();
  return jsonData;
}

export async function getExerciseInfo(exerciseId: number) {
  const data = await fetch(`${WGER_URL_API}/exerciseinfo/${exerciseId}`);
  const jsonData = await data.json();
  return jsonData;
}

export async function getMuscleInfo(muscleId: string) {
  const data = await fetch(`${WGER_URL_API}/muscle/${muscleId}`);
  const jsonData = await data.json();
  return jsonData;
}
