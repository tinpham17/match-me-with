import { Profile } from './profile'

export interface User {
  id: string
  email: string
  profile: Profile
}

export interface RegisterRequestParams {
  email: string
  password: string
  name: string
  photo: string
  age: string
}

export interface LoginRequestParams {
  email: string
  password: string
}

export interface InteractedProfiles {
  likedProfiles: Profile[]
  passedProfiles: Profile[]
}
