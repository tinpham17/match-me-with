import { useEffect, useState } from 'react'
import { getInteractedProfiles } from 'services/user'
import Layout from 'components/Layout/Layout'
import Loader from 'components/Loader/Loader'
import PersonList from 'components/PersonList/PersonList'
import { Profile } from 'types/profile'
import { useAuth } from 'context/auth'
import { Link } from 'react-router-dom'
import { config } from 'config'

function Liked() {
  const [ loading, setLoading ] = useState(false)
  const [ likedProfiles, setLikedProfiles ] = useState<Profile[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const load = async () => {
      if (user?.id) {
        setLoading(true)
        try {
          const result = await getInteractedProfiles(user?.id)
          setLikedProfiles(result.likedProfiles)
        } catch (e) {
          alert(e)
        } finally {
          setLoading(false)
        }
      }
    }
    load()
  }, [user])

  return (
    <Layout hasHeader hasNavBar>
      <Loader loading={loading}/>
      <PersonList profiles={likedProfiles}/>
      {
        (!loading && !likedProfiles.length)
        &&
        <div style={{textAlign: 'center'}}>
          <p>Ops</p>
          <p>You have not liked any profile yet. Let's <Link to={config.routes.explore}>explore</Link></p>
        </div>
      }
    </Layout>
  )
}
export default Liked
