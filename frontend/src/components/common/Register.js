import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import { Container, Form, TabContainer, Col, Row, Alert } from 'react-bootstrap';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ButtonGroup } from "@mui/material";
import Alert from '@mui/material/Alert';
import TimePicker from 'react-time-picker';
import TimeField from 'react-simple-timefield';

const Register = () => {
	const [role, setRole] = useState("Buyer");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [contact, setContact] = useState("");
	const [age, setAge] = useState("");
	const [batch, setBatch] = useState("");
	const [shopName, setShopName] = useState("");
	const [shopStart, setShopStart] = useState("");
	const [shopEnd, setShopEnd] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [date, setDate] = useState(null);
	const [alert, setAlert] = useState(false);
	const [message, setMessage] = useState("");
	const [registered, setRegistered] = useState(false);
	//   const { id, setId } = useContext(UserContext);

	const onChangeRole = (event) => {
		setRole(event.target.value);
		// console.log(role)
	};
	const onChangeUsername = (event) => {
		setName(event.target.value);
		// console.log(name)
	};
	const onChangeEmail = (event) => {
		setEmail(event.target.value);
	};
	const onChangeContact = (event) => {
		setContact(event.target.value);
	};
	const onChangeAge = (event) => {
		setAge(event.target.value);
	};
	const onChangeBatch = (event) => {
		setBatch(event.target.value);
	};
	const onChangeShopName = (event) => {
		setShopName(event.target.value);
	};
	const onChangeShopStart = (event) => {
		setShopStart(event.target.value);
	};
	const onChangeShopEnd = (event) => {
		setShopEnd(event.target.value);
	};
	const onChangePassword = (event) => {
		setPassword(event.target.value);
	};
	const onChangePassword2 = (event) => {
		setPassword2(event.target.value);
	};

	const resetInputs = () => {
		setRole("Buyer");
		setName("");
		setEmail("");
		setDate(null);
		setContact("");
		setAge("");
		setBatch("");
		setShopName("");
		setShopStart("");
		setShopEnd("");
		setPassword("");
		setPassword2("");
		setRegistered(false);
		setAlert(false);
		setMessage(false);
	};

	const Submit = () => {
		// event.preventDefault();

		if (role === "Buyer") {
			const res = {
				name: name,
				email: email,
				password: password,
				password2: password2,
				contact: contact,
				age: age,
				batch: batch
			};
			axios
				.post("http://localhost:4000/buyer/register", res)
				.then((response) => {
					// alert("Created\t" + response.data.name);
					console.log(response.data);
					console.log(response.data.status);
					if (response.data.status === 200) {
						setAlert(false);
						setRegistered(true);
					}
					else {
						setMessage(response.data.message);
						setAlert(true);
						setRegistered(false);
					}
				});
			resetInputs();
		}
		else if (role === "Vendor") {
			const res = {
				name: name,
				email: email,
				password: password,
				password2: password2,
				contact: contact,
				shopName: shopName,
				shopStart: shopStart,
				shopEnd: shopEnd
			};
			axios
				.post("http://localhost:4000/vendor/register", res)
				.then((response) => {
					// alert("Created\t" + response.data.name);
					console.log(response.data);
					console.log(response.data.status)
					if (response.data.status === 200) {
						setAlert(false);
						setRegistered(true);
					}
					else {
						setMessage(response.data.message);
						setAlert(true);
						setRegistered(false);
					}
				});

			resetInputs();
		}
	};

	// var s = Date().toLocaleString();
	// var time = s.slice(16,21);
	// console.log(Date().slice(16,21));

	if (role === "Buyer") {
		return (
			<Grid container align={"center"} spacing={2}>
				<h1>Buyer Registration</h1>
				{alert &&
					<Alert severity='error' onClose={() => setAlert(false)} dismissible="true">
						{message}
					</Alert>
				}

				{registered &&
					<Alert severity='success' onClose={() => setRegistered(false)} dismissible="true">
						You have been registered, head to the LogIn page to log in!
					</Alert>
				}
				<Grid item xs={12}>
					<FormControl sx={{ m: 1, minWidth: 210 }}>
						<InputLabel id="demo-simple-select-label">Role</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={role}
							label="Role"
							onChange={onChangeRole}
						>
							<MenuItem value={"Buyer"}>Buyer</MenuItem>
							<MenuItem value={"Vendor"}>Vendor</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Name"
						variant="outlined"
						value={name}
						onChange={onChangeUsername}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Email"
						variant="outlined"
						value={email}
						onChange={onChangeEmail}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Contact"
						variant="outlined"
						value={contact}
						onChange={onChangeContact}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Age"
						variant="outlined"
						value={age}
						onChange={onChangeAge}
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControl sx={{ m: 1, minWidth: 210 }}>
						<InputLabel id="demo-simple-select-label">Batch</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={batch}
							label="Batch"
							onChange={onChangeBatch}
						>
							<MenuItem value={"UG1"}>UG1</MenuItem>
							<MenuItem value={"UG2"}>UG2</MenuItem>
							<MenuItem value={"UG3"}>UG3</MenuItem>
							<MenuItem value={"UG4"}>UG4</MenuItem>
							<MenuItem value={"UG5"}>UG5</MenuItem>
							<MenuItem value={"PG1"}>PG1</MenuItem>
							<MenuItem value={"PG2"}>PG2</MenuItem>
							<MenuItem value={"PhD"}>PhD</MenuItem>
							<MenuItem value={"Other"}>Other</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Password"
						type="password"
						autoComplete="current-password"
						variant="outlined"
						value={password}
						onChange={onChangePassword}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Confirm Password"
						type="password"
						autoComplete="current-password"
						variant="outlined"
						value={password2}
						onChange={onChangePassword2}
					/>
				</Grid>
				<Grid item xs={12}>
					<ButtonGroup variant="contained" type="submit" onClick={() => Submit()}>
						<Button>Submit</Button>
					</ButtonGroup>
					<Link to='/'>
						<Button variant="danger" className="mb-3">Go Back</Button>
					</Link>
				</Grid>
			</Grid>
		);
	}
	if (role === "Vendor") {
		return (
			<Grid container align={"center"} spacing={2}>
				<h1>Vendor Registration</h1>
				{alert &&
					<Alert severity='error' onClose={() => setAlert(false)} dismissible="true">
						{message}
					</Alert>
				}
				{registered &&
					<Alert severity='success' onClose={() => setRegistered(false)} dismissible="true">
						You have been registered, head to the Sign In page to sign in!
					</Alert>
				}
				<Grid item xs={12}>
					<FormControl sx={{ m: 2, minWidth: 210 }}>
						<InputLabel id="demo-simple-select-label">Role</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={role}
							label="Role"
							onChange={onChangeRole}
						>
							<MenuItem value={"Buyer"}>Buyer</MenuItem>
							<MenuItem value={"Vendor"}>Vendor</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Name"
						variant="outlined"
						value={name}
						onChange={onChangeUsername}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Email"
						variant="outlined"
						value={email}
						onChange={onChangeEmail}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Contact"
						variant="outlined"
						value={contact}
						onChange={onChangeContact}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Shop Name"
						variant="outlined"
						value={shopName}
						onChange={onChangeShopName}
					/>
				</Grid>
				<Grid item xs={12}>
					Enter shop start time
					<div>
						<TimeField
							value={shopStart}
							onChange={onChangeShopStart}
							colon=":"
							
						/>
					</div>
				</Grid>
				<Grid item xs={12}>
					Enter shop end time
					<div>
						<TimeField
							value={shopEnd}
							onChange={onChangeShopEnd}
							colon=":"
						/>
					</div>
					{/* {console.log(shopStart)} */}
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Password"
						type="password"
						autoComplete="current-password"
						variant="outlined"
						value={password}
						onChange={onChangePassword}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Confirm Password"
						type="password"
						autoComplete="current-password"
						variant="outlined"
						value={password2}
						onChange={onChangePassword2}
					/>
				</Grid>
				<Grid item xs={12}>
					<ButtonGroup variant="contained" type="submit" onClick={() => Submit()}>
						<Button>Submit</Button>
					</ButtonGroup>
					<Link to='/'>
						<Button variant="danger" className="mb-3">Go Back</Button>
					</Link>
				</Grid>
			</Grid>
		);
	}
};

export default Register;
