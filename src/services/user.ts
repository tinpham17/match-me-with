import { config } from 'config'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, getDocs, query, orderBy, where, doc, FirestoreDataConverter, updateDoc } from 'firebase/firestore'
import { auth, firestore } from './firebase-app'
import { InteractedProfiles, LoginRequestParams, RegisterRequestParams, User } from 'types/user'
import { Profile } from 'types/profile'

const converter: FirestoreDataConverter<Profile> = {
  toFirestore: (data: Profile) => data,
  fromFirestore: (snap) => snap.data() as Profile
}

async function register(params: RegisterRequestParams): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, params.email, params.password)
  const profile: Profile = {
    id: result.user.uid,
    age: params.age,
    name: params.name,
    photo: params.photo,
  }
  addDoc(collection(firestore, config.firebase.collection.profiles), profile)
  return {
    id: result.user.uid,
    email: params.email,
    profile
  }
}

async function login(params: LoginRequestParams): Promise<User> {
  const userResult = await signInWithEmailAndPassword(auth, params.email, params.password)
  const q = query(collection(firestore, config.firebase.collection.profiles).withConverter(converter), where('id', '==', userResult.user.uid))
  const profileResult = await getDocs(q)
  const data = profileResult.docs.map((doc) => doc.data())
  if (!data[0]) {
    throw new Error('Please register first')
  }
  return {
    id: userResult.user.uid,
    email: params.email,
    profile: data[0]
  }
}

async function getProfiles(excludedIds: string[]): Promise<Profile[]> {
  const result = await getDocs(query(collection(firestore, config.firebase.collection.profiles).withConverter(converter), orderBy('name', 'desc')))
  const profiles = result.docs.map((doc) => doc.data())
  return profiles.filter((p) => !excludedIds.includes(p.id))
}

async function interactProfile(userId: string, profileId: string, liked: boolean) {
  const q = query(collection(firestore, config.firebase.collection.profiles).withConverter(converter), where('id', '==', userId))
  const result = await getDocs(q)
  if (!result.docs[0]) {
    throw new Error(`User id ${userId} does not exist`)

  }
  const currentLikedProfileIds = result.docs[0].data().likedProfileIds ?? []
  const currentPassedProfileIds = result.docs[0].data().passedProfileIds ?? []
  const likedProfileIds = liked
    ? currentLikedProfileIds.includes(profileId) ? currentLikedProfileIds : currentLikedProfileIds.concat(profileId)
    : currentLikedProfileIds.filter((id) => id !== profileId)
  const passedProfileIds = liked
    ? currentPassedProfileIds.filter((id) => id !== profileId)
    : currentPassedProfileIds.includes(profileId) ? currentPassedProfileIds : currentPassedProfileIds.concat(profileId)
  updateDoc<Profile>(doc(firestore, config.firebase.collection.profiles, result.docs[0].id).withConverter(converter), {
    likedProfileIds,
    passedProfileIds
  })
}

async function getInteractedProfiles(userId: string): Promise<InteractedProfiles> {
  const profileResult = await getDocs(query(collection(firestore, config.firebase.collection.profiles).withConverter(converter), where('id', '==', userId)))
  const data = profileResult.docs.map((doc) => doc.data())
  if (!data[0]) {
    throw new Error(`User id ${userId} does not exist`)
  }
  const profile = data[0]
  const profiles = await getProfiles([])
  return {
    likedProfiles: profiles.filter((p) => profile.likedProfileIds?.includes(p.id)),
    passedProfiles: profiles.filter((p) => profile.passedProfileIds?.includes(p.id))
  }
}

export {
  register,
  login,
  getProfiles,
  getInteractedProfiles,
  interactProfile
}
