import { useEffect, useState } from 'react'
import { getProfiles } from 'services/user'
import Layout from 'components/Layout/Layout'
import Loader from 'components/Loader/Loader'
import PersonCard from 'components/PersonCard/PersonCard'
import { Profile } from 'types/profile'
import { useAuth } from 'context/auth'

function Home() {
  const [ loading, setLoading ] = useState(false)
  const [ profiles, setProfiles ] = useState<Profile[]>([])
  const [ visibleProfile, setVisibleProfile ] = useState<Profile | null>(null)
  const [ liked, setLiked ] = useState<Profile[]>([])
  const { user } = useAuth()

  const handleLike = (value: boolean) => {
    if (visibleProfile) {
      if (value) {
        setLiked([...liked, visibleProfile])
      }
      const newProfiles = [...profiles].filter((p) => p.id !== visibleProfile.id)
      setProfiles(newProfiles)
      setVisibleProfile(newProfiles[0])
    }
  }

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const result = await getProfiles(user ? [user.id] : [])
        setProfiles(result)
        if (result[0]) {
          setVisibleProfile(result[0])
        }
      } catch (e) {
        alert(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <Layout hasHeader>
      <Loader loading={loading}/>
      {
        visibleProfile && <PersonCard profile={visibleProfile} onLike={(value) => handleLike(value)} />
      }
      {
        (!loading && !profiles.length)
        &&
        <div style={{textAlign: 'center'}}>
          <p>That's all</p>
          <p>You liked {liked.length ? liked.map((p) => p.name).join(', ') : 'no one'}</p>
        </div>
      }
    </Layout>
  )
}
export default Home
