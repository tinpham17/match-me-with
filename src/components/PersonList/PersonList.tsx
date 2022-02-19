import { Profile } from 'types/profile'
import styles from './PersonList.module.scss'

type Props = {
  profiles: Profile[]
}

function PersonList(props: Props) {
  return (
    <div className={styles.container}>
      {
        props.profiles.map((profile) => (
          <div className={styles.card} key={profile.id}>
            <div
              className={styles.thumbnail}
              style={{background: `url(${profile.photo})`}}
            />
            <div className={styles.meta}>
              <div className={styles.title}>
                {profile.name}
                <span>, {profile.age}</span>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default PersonList
