import { ReactNode } from 'react'
import classNames from 'classnames'
import Header from 'components/Header/Header'
import NavBar from 'components/NavBar/NavBar'
import styles from './Layout.module.scss'

type Props = {
  children: ReactNode
  hasHeader?: boolean
  hasNavBar?: boolean
}

function Layout(props: Props) {
  return (
    <div className={styles.container}>
      {
        props.hasHeader && <div className={styles.header}><Header/></div>
      }
      <div className={classNames(styles.body, {[styles.withHeader]: props.hasHeader, [styles.withNavBar]: props.hasNavBar})}>
        {props.children}
      </div>
      {
        props.hasNavBar && <div className={styles.navbar}><NavBar/></div>
      }
    </div>
  )
}
export default Layout
