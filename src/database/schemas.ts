import Realm from "realm";

const Workout = {
  name: "Workout",
  primaryKey: "id",
  properties: {
    id: "objectId",
    name: { type: "string", default: "", indexed: true },
    description: { type: "string?", default: "" },
    muscleCategories: { type: "MuscleCategory[]?", indexed: true },
    exercises: { type: "Exercise[]?" },
  },
};

const Exercise = {
  name: "Exercise",
  primaryKey: "id",
  properties: {
    id: "objectId",
    name: { type: "string", default: "", indexed: true },
    description: { type: "string?", default: "" },
    muscleCategories: { type: "MuscleCategory[]?", indexed: true },
    image: { type: "string?", default: "" },
  },
};

const MuscleCategory = {
  name: "MuscleCategory",
  primaryKey: "id",
  properties: {
    id: "objectId",
    name: { type: "string", default: "", indexed: true },
  },
};

export { Workout, Exercise, MuscleCategory };
