import axios from "axios";
import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { USER_PROFILE } from "../../sharedQueries";
import {
	updateProfile,
	updateProfileVariables,
	userProfile
} from "../../types/api";
import EditAccountPresenter from "./EditAccountPresenter";
import { UPDATE_PROFILE } from "./EditAccountQueries";

interface IState {
	firstname: string;
	lastname: string;
	profilePhoto: string;
	uploading: boolean;
}

interface IProps extends RouteComponentProps<any> {}

class UpdateProfileMutation extends Mutation<
	updateProfile,
	updateProfileVariables
> {}

class ProfileQuery extends Query<userProfile> {}

class EditAccountContainer extends React.Component<IProps, IState> {
	public state = {
		firstname: "",
		lastname: "",
		profilePhoto: "",
		uploading: false
	};
	public render() {
		const { firstname, lastname, profilePhoto, uploading } = this.state;
		return (
			<ProfileQuery
				query={USER_PROFILE}
				fetchPolicy={"cache-and-network"}
				onCompleted={this.updateFields}
			>
				{() =>
					<UpdateProfileMutation
						mutation={UPDATE_PROFILE}
						refetchQueries={[{ query: USER_PROFILE }]}
						onCompleted={data => {
							const { UpdateProfile } = data;
							if (UpdateProfile.ok) {
								toast.success("Profile updated!");
							} else if (UpdateProfile.error) {
								toast.error(UpdateProfile.error);
							}
						}}
						variables={{
							firstname,
							lastname,
							profilePhoto
						}}
					>
						{(updateProfileFn, { loading }) =>
							<EditAccountPresenter
								firstname={firstname}
								lastname={lastname}
								profilePhoto={profilePhoto}
								onInputChange={this.onInputChange}
								loading={loading}
								onSubmit={updateProfileFn}
								uploading={uploading}
							/>}
					</UpdateProfileMutation>}
			</ProfileQuery>
		);
	}
	public onInputChange: React.ChangeEventHandler<
		HTMLInputElement
	> = async event => {
		const { target: { name, value, files } } = event;
		if (files) {
			this.setState({
				uploading: true
			});
			const formData = new FormData();
			formData.append("file", files[0]);
			formData.append("api_key", "811881451928618");
			formData.append("upload_preset", "tqecb16q");
			formData.append("timestamp", String(Date.now() / 1000));
			const { data: { secure_url } } = await axios.post(
				"https://api.cloudinary.com/v1_1/djjpx4ror/image/upload",
				formData
			);
			if (secure_url) {
				this.setState({
					profilePhoto: secure_url,
					uploading: false
				});
			}
		}
		this.setState(
			{
				[name]: value
			} as any
		);
	};

	public updateFields = (data: {} | userProfile) => {
		if ("GetMyProfile" in data) {
			const { GetMyProfile: { user } } = data;
			if (user !== null) {
				const { firstname, lastname, profilePhoto } = user;
				this.setState(
					{
						firstname,
						lastname,
						profilePhoto,
						uploaded: profilePhoto !== null
					} as any
				);
			}
		}
	};
}

export default EditAccountContainer;
