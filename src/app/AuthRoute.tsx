import * as React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom'
import { RootState } from './rootReducer'

interface IRouteProps {
    component?: React.FunctionComponent<any>
    render?: () => React.FunctionComponent<any>
}

type Props = IRouteProps & RouteComponentProps<any> | RouteProps

export const AuthRoute: React.FC<Props> = (props: Props) => {
    const {
        component: ComponentToRender,
        render: RenderComponent,
        ...rest
    } = props

    const { isLoggedIn } = useSelector((state: RootState) => state.auth)

    if (!isLoggedIn) {
        localStorage.loginRedirect = rest.location.pathname
        return <Redirect to="/signin" />
    }
    if (!ComponentToRender && RenderComponent) {
        return <Route {...rest} render={RenderComponent} />
    }
    return (
        <Route
            {...rest}
            component={ComponentToRender}
        />
    )
}
