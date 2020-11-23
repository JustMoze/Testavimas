import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUserId } from '../services/authService';

function ProtectedRoute(props) {
	const { safeFromUser = false, redirectPath, component: Component, render, ...rest } = props;
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!safeFromUser) {
					if (!getUserId())
						return (
							<Redirect
								to={{
									pathname: redirectPath,
									state: { from: props.location }
								}}
							/>
						);
				} else {
					if (getUserId())
						return (
							<Redirect
								to={{
									pathname: redirectPath,
									state: { from: props.location }
								}}
							/>
						);
				}
				return Component ? <Component {...props} /> : render(props);
			}}
		/>
	);
}

export default ProtectedRoute;
