import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries.local";
import { facebookConnect, facebookConnectVariables } from "../../types/api";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";

class LoginMutation extends Mutation<
	facebookConnect,
	facebookConnectVariables
> {}

interface IState {
	firstname: string;
	lastname: string;
	email?: string;
	fbId: string;
}

interface IProps extends RouteComponentProps<any> {}

class SocialLoginContainer extends React.Component<IProps, IState> {
	public state = {
		email: "",
		fbId: "",
		firstname: "",
		lastname: ""
	};
	public facebookMutation: MutationFn;
	public render() {
		return (
			<Mutation mutation={LOG_USER_IN}>
				{logUserIn =>
					<LoginMutation
						mutation={FACEBOOK_CONNECT}
						onCompleted={data => {
							const { FacebookConnect } = data;
							if (FacebookConnect.ok) {
								logUserIn({
									variables: {
										token: FacebookConnect.token
									}
								});
							} else {
								toast.error(FacebookConnect.error);
							}
						}}
					>
						{(facebookMutation, { loading }) => {
							this.facebookMutation = facebookMutation;
							return (
								<SocialLoginPresenter
									loginCallback={this.loginCallback}
								/>
							);
						}}
					</LoginMutation>}
			</Mutation>
		);
	}

	public loginCallback = response => {
		const {
			name,
			first_name,
			last_name,
			email,
			id,
			accessToken
		} = response;
		if (accessToken) {
			this.facebookMutation({
				variables: {
					email,
					fbId: id,
					firstname: first_name,
					lastname: last_name
				}
			});
			toast.success(`Welcome ${name}!`);
		} else {
			toast.error("Could not log you in 😔");
		}
	};
}

export default SocialLoginContainer;
