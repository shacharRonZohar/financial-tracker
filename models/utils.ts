import type {Ref} from 'vue'

export interface StringIndex extends Object {
  [key: string]: any
}

export type MaybeRef<T> = T | Ref<T>

export interface MaybeRefIndexer<T> {
  [key: string]: MaybeRef<T>
}

export type MapToMaybeRef<T> = {
  [P in keyof T]: MaybeRef<T[P]>
}

export type InputPrefix<T extends string> = `${T}Input`

export type MapToInput<T extends StringIndex> = {
  [P in keyof T as InputPrefix<P extends string ? P : ''>]: T[P]
}

export type MapToMaybeRefInputs<T extends StringIndex> = MapToMaybeRef<MapToInput<T>>
