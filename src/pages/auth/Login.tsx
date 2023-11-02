import React, { FC, useState } from "react";
import { CustomInput } from "../../components/input";
import { useNavigate } from "react-router-dom"
import InputValidation from "../../helpers/InputValidation";
import "./Coba.css";

interface DataLogin {
	email?: string | null,
	password?: string | null,
}

const Login: FC = () => {
	const navigate = useNavigate();
	const [data, setData] = useState<DataLogin>({
		email: '',
		password: '',
	});

	const [errData, setErrData] = useState<DataLogin>({
		email: '',
		password: '',
	});


	/* ------------------------------ OnChange Data ----------------------------- */
	const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const { name, value } = e.target;

		let strErr = ""
		if (name === "email") {
			strErr = InputValidation.EmailValidation(value, 100, "Email", true);
		}
		if (name === "password") {
			strErr = InputValidation.PasswordValidation(value, 4, 12, "Password", true);
		}

		setErrData({
			...errData,
			[name]: strErr
		});

		setData({
			...data,
			[name]: value
		});
	};
	/* ------------------------------ End OnChange ------------------------------ */

	/* -------------------------------- OnSubmit -------------------------------- */
	const onSubmit = () => {
		const valid = onValidation();
		if (valid) {
			console.log(data);
		}
	};
	/* ------------------------------ End OnSubmit ------------------------------ */
	/* ------------------------------ On Validation ----------------------------- */
	const onValidation = (): boolean => {
		const tempValidation: DataLogin = {
			email: InputValidation.EmailValidation(data.email, 100, "Email", true),
			password: InputValidation.PasswordValidation(data.password, 4, 12, "Password", true)
		};

		setErrData(tempValidation);

		for (var key in tempValidation) {
			if ((tempValidation as any)[key] !== "") {
				return false;
			}
		}
		return true;
	};
	/* ---------------------------- End On Validation --------------------------- */

	return (
	<div className="container justify-content-center align-items-center">
        <div className="card card-compact w-96 bg-gray-200 shadow-xl mx-auto">
            <figure><img src="/images/logo.png" alt="Logo"  width="150" height="150" className="d-inline-block align-text-top me-0 mt-5"/></figure><br></br>
            <h4 className="font-bold text-center text-2xl text-menu-label mb-2 mt-2">Login</h4>
            <p className=" text-center font-normal mb-4">Sistem Akademik</p>
            <hr className="horizontal-line"/>
				<div className="mb-5 mr-4 ml-4 mt-8">
					<CustomInput
						name="email"
						label="Email"
						required={true}
						type="email"
						value={data.email ?? ''}
						error={errData.email}
						onChange={onChange}
					/> 
				</div>
				<div className="mb-5 mr-4 ml-4">
					<CustomInput
						name="password"
						label="Password"
						required={true}
						type="password"
						value={data.password ?? ''}
						error={errData.password}
						onChange={onChange}
					/>
				</div>

				<div className="flex justify-content-center items-center mr-4 ml-4 mb-5">
					<button onClick={onSubmit} className=" btn btn-primary normal-case mx-auto w-full font-bold">LOGIN</button>
				</div>
        </div>
    </div>
	)
};

export default Login;