import { faHeart, faCompass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config } from 'config'
import { Link } from 'react-router-dom'
import styles from './NavBar.module.scss'

function NavBar() { 
  return (
    <div className={styles.container}>
      <Link to={config.routes.explore} className={styles.option}>
        <FontAwesomeIcon icon={faCompass}/>
        <span>Explore</span>
      </Link>
      <Link to={config.routes.liked} className={styles.option}>
        <FontAwesomeIcon icon={faHeart}/>
        <span>Liked</span>
      </Link>
    </div>
  )
}
export default NavBar
