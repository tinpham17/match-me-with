export interface Profile {
  id: string
  name: string
  age: string
  photo: string
  likedProfileIds?: string[]
  passedProfileIds?: string[]
}
