import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Profile } from 'types/profile'
import styles from './PersonCard.module.scss'

type Props = {
  profile: Profile
  onLike?: (value: boolean) => void
}

function PersonCard(props: Props) {
  const handleLike = (value: boolean) => {
    if (props.onLike) {
      props.onLike(value)
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.thumbnail}>
        <img src={props.profile.photo} alt="Avatar" />
      </div>
      <div className={styles.meta}>
        <div className={styles.title}>
          {props.profile.name}
          <span>, {props.profile.age}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={() => handleLike(true)}>
          <FontAwesomeIcon icon={faHeart}/>
        </button>
        <button onClick={() => handleLike(false)}>
          <FontAwesomeIcon icon={faTimes}/>
        </button>
      </div>
    </div>
  )
}

export default PersonCard
