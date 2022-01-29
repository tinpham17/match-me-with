import { config } from 'config'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, getDocs, query, orderBy, where, DocumentData } from 'firebase/firestore'
import { auth, firestore } from './firebase-app'
import { LoginRequestParams, RegisterRequestParams, User } from 'types/user'
import { Profile } from 'types/profile'

const mapDocumentDataToProfile = (item: DocumentData): Profile => {
  return {
    id: item['id'],
    name: item['name'],
    age: item['age'],
    photo: item['photo']
  }
}

async function register(params: RegisterRequestParams): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, params.email, params.password)
  const profile: Profile = {
    id: result.user.uid,
    age: params.age,
    name: params.name,
    photo: params.photo
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
  const profileResult = await getDocs(query(collection(firestore, config.firebase.collection.profiles), where('id', '==', userResult.user.uid)))
  const data = profileResult.docs.map((doc) => doc.data())
  if (!data[0]) {
    throw new Error('Please register first')
  }
  return {
    id: userResult.user.uid,
    email: params.email,
    profile: mapDocumentDataToProfile(data[0])
  }
}

async function getProfiles(excludedIds: string[]): Promise<Profile[]> {
  const result = await getDocs(query(collection(firestore, config.firebase.collection.profiles), orderBy('name', 'desc')))
  const data = result.docs.map((doc) => doc.data())
  const profiles = data.map(mapDocumentDataToProfile)
  return profiles.filter((p) => !excludedIds.includes(p.id))
}

export {
  register,
  login,
  getProfiles,
}
