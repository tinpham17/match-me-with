import { useEffect, useState } from 'react'
import { getProfiles, interactProfile } from 'services/user'
import Layout from 'components/Layout/Layout'
import Loader from 'components/Loader/Loader'
import PersonCard from 'components/PersonCard/PersonCard'
import { Profile } from 'types/profile'
import { useAuth } from 'context/auth'

function Explore() {
  const [ loading, setLoading ] = useState(false)
  const [ profiles, setProfiles ] = useState<Profile[]>([])
  const [ visibleProfile, setVisibleProfile ] = useState<Profile | null>(null)
  const [ liked, setLiked ] = useState<Profile[]>([])
  const { user } = useAuth()

  const handleLike = async (value: boolean) => {
    if (visibleProfile) {
      setLoading(true)
      try {
        await interactProfile(user?.id!, visibleProfile.id, value)
        if (value) {
          setLiked([...liked, visibleProfile])
        }
        const newProfiles = [...profiles].filter((p) => p.id !== visibleProfile.id)
        setProfiles(newProfiles)
        setVisibleProfile(newProfiles[0])
      } catch(e) {
        alert(e)
      } finally {
        setLoading(false)
      }
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
  }, [user])

  return (
    <Layout hasHeader hasNavBar>
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
export default Explore
