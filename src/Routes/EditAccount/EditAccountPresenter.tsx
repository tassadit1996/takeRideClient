import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import PhotoInput from "../../Components/PhotoInput";
import styled from "../../typed-components";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

interface IProps {
	firstname: string;
	lastname: string;
	profilePhoto: string;
	onSubmit: MutationFn;
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	loading: boolean;
	uploading: boolean;
}

const EditAccountPresenter: React.SFC<IProps> = ({
	firstname,
	lastname,
	onSubmit,
	profilePhoto,
	onInputChange,
	loading,
	uploading
}) =>
	<Container>
		<Helmet>
			<title>Edit Account | Number</title>
		</Helmet>
		<Header title={"Edit Account"} backTo={"/"} />
		<ExtendedForm submitFn={onSubmit}>
			<PhotoInput
				uploading={uploading}
				fileUrl={profilePhoto}
				onChange={onInputChange}
			/>
			<ExtendedInput
				onChange={onInputChange}
				type={"text"}
				value={firstname}
				placeholder={"First name"}
				name={"firstname"}
			/>
			<ExtendedInput
				onChange={onInputChange}
				type={"text"}
				value={lastname}
				placeholder={"Last name"}
				name={"lastname"}
			/>
			<Button onClick={null} value={loading ? "Loading" : "Update"} />
		</ExtendedForm>
	</Container>;

export default EditAccountPresenter;
