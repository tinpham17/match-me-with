import { createElement } from 'react'
import { Redirect, Route } from 'react-router'
import { useAuth } from 'context/auth'

function PrivateRoute({ component, redirectUrl, ...rest }: any) {
  const { user } = useAuth()
  return (
    <Route {...rest} render={(props) => (
      user
        ? createElement(component, props)
        : <Redirect to={redirectUrl} />
    )}
    />
  )
}
export default PrivateRoute
