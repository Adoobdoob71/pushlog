import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"

@Entity()
export class Workout {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @OneToMany((type) => Exercise, (exercise) => exercise.workout, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  exercises: Exercise[]

  @OneToMany(
    (type) => MuscleCategory,
    (muscleCategory) => muscleCategory.workout,
    {
      eager: true,
      cascade: true,
    }
  )
  @JoinColumn()
  muscleCategories: MuscleCategory[]
}

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  exerciseNumber: number

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  image: string

  @CreateDateColumn()
  when: Date

  @OneToMany(
    (type) => MuscleCategory,
    (muscleCategory) => muscleCategory.exercise,
    {
      eager: true,
      cascade: true,
    }
  )
  @JoinColumn()
  muscleCategories: MuscleCategory[]

  @ManyToOne((type) => Workout, (workout) => workout.exercises, {
    onDelete: "CASCADE",
  })
  workout: Workout
}

@Entity()
export class MuscleCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  muscleId: number

  @Column()
  name: string

  @ManyToOne((type) => Workout, (workout) => workout.muscleCategories, {
    onDelete: "CASCADE",
  })
  workout: Workout

  @ManyToOne((type) => Exercise, (exercise) => exercise.muscleCategories, {
    onDelete: "CASCADE",
  })
  exercise: Exercise
}

@Entity()
export class WorkoutSession {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", array: true })
  workoutTemplateIds: string[]

  @CreateDateColumn()
  when: Date

  @OneToMany((type) => ExerciseSet, (set) => set.workoutSession, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  sets: ExerciseSet[]
}

@Entity()
export class ExerciseSet {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  workoutSessionId: string

  @Column()
  exerciseNumber: number

  @Column()
  setNumber: number

  @Column()
  reps: number

  @Column()
  weight: number

  @Column({ type: "varchar", length: 500 })
  note: string

  @CreateDateColumn()
  when: Date

  @ManyToOne((type) => WorkoutSession, (session) => session.sets, {
    onDelete: "CASCADE",
  })
  workoutSession: WorkoutSession
}
