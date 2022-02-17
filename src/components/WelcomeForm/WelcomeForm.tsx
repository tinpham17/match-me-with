import { useAuth } from 'context/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import styles from './WelcomeForm.module.scss'

function WelcomeForm() {
  const { user, logout } = useAuth()

  const handleClickLogout = () => {
    logout()
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Welcome {user?.profile?.name}</div>
      <button onClick={handleClickLogout}>
        <FontAwesomeIcon icon={faSignOutAlt}/>
        <span>Logout</span>
      </button>
    </div>
  )
}

export default WelcomeForm
