import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Home from "../../Routes/Home";
import Ride from "../../Routes/Ride";
import EditAccount from "../../Routes/EditAccount";
import Settings from "../../Routes/Settings";
import Places from "../../Routes/Places";
import AddPlace from "../../Routes/AddPlace";
import FindAddress from "../../Routes/FindAddress";
import OutHome from "../../Routes/Login";
import PhoneLogin from "../../Routes/PhoneLogin";
import VerifyPhone from "../../Routes/VerifyPhone";
import SocialLogin from "../../Routes/SocialLogin";
import Chat from "../../Routes/Chat";

interface IProps {
	isLoggedIn: boolean;
}

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) =>
	<BrowserRouter>
		{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
	</BrowserRouter>;

const LoggedInRoutes: React.SFC = () =>
	<Switch>
		<Route
			path={"/"}
			// @ts-ignore
			exact={true}
			component={Home}
		/>
		<Route
			path={"/ride/:rideId"}
			// @ts-ignore

			exact={true}
			component={Ride}
		/>
		<Route
			path={"/chat/:chatId"}
			// @ts-ignore
			exact={true}
			component={Chat}
		/>
		<Route path={"/edit-account"} component={EditAccount} />
		<Route path={"/settings"} component={Settings} />
		<Route path={"/places"} component={Places} />
		<Route path={"/add-place"} component={AddPlace} />
		<Route path={"/find-address"} component={FindAddress} />
		<Redirect to={"/"} />
	</Switch>;
const LoggedOutRoutes: React.SFC = () =>
	<Switch>
		<Route
			path={"/"}
			// @ts-ignore
			exact={true}
			component={OutHome}
		/>
		<Route path={"/phone-login"} component={PhoneLogin} />
		<Route path={"/verify-phone"} component={VerifyPhone} />
		<Route path={"/social-login"} component={SocialLogin} />
		<Redirect to={"/"} />
	</Switch>;
AppPresenter.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired
};

export default AppPresenter;
