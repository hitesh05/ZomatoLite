import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import React, { useState, useEffect } from "react";
import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Login from "./components/common/Login";
import Navbar from "./components/templates/Navbar";
import NavbarBuyer from "./components/templates/Navbar_buyer";
import NavbarVendor from "./components/templates/Navbar_vendor";

import BuyerProfile from "./components/profile/buyer_profile";
import VendorProfile from "./components/profile/vendor_profile";
import AddFood from "./components/vendor/addFood";
import AddFilters from "./components/buyer/filters";
import ViewFood from "./components/vendor/viewFood";
import EditFood from "./components/vendor/editFood";
import OrderFood from "./components/buyer/orderFood";
import MyOrders from "./components/buyer/myOrders";
import MyOrders2 from "./components/vendor/myorders";
import Stats from "./components/vendor/stats";

const Layout = () => {
	return (
		<div>
			<Navbar />
			<div className="container">
				<Outlet />
			</div>
		</div>
	);
};

const Layout2 = () => {
	return (
		<div>
			<NavbarBuyer />
			<div className="container">
				<Outlet />
			</div>
		</div>
	);
};

const Layout3 = () => {
	return (
		<div>
			<NavbarVendor />
			<div className="container">
				<Outlet />
			</div>
		</div>
	);
};

function App() {
	const [id, setId] = useState();
	const [role, setRole] = useState();

	useEffect(() => {
		// console.log(id);
		// console.log(role);
		if (!role) setRole(localStorage.getItem('ZomatoRole'));
		if (!id) setId(localStorage.getItem('ZomatoId'));
	}, [role, id]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/users" element={<UsersList />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Route>
				<Route path="/profile/buyer/:id" element={<Layout2 />}>
					<Route path="/profile/buyer/:id" element={<BuyerProfile />} />
					<Route path="/profile/buyer/:id/viewItems" element={<AddFilters />} />
					<Route path="/profile/buyer/:id/viewItems/order" element={<OrderFood />} />
					<Route path="/profile/buyer/:id/myorders" element={<MyOrders />} />
				</Route>
				<Route path="/profile/vendor/:id" element={<Layout3 />}>
					<Route path="/profile/vendor/:id" element={<VendorProfile />} />
					<Route path="/profile/vendor/:id/addFood" element={<AddFood />} />
					<Route path="/profile/vendor/:id/viewFood" element={<ViewFood />} />
					<Route path="/profile/vendor/:id/viewFood/edit" element={<EditFood />} />
					<Route path="/profile/vendor/:id/myorders" element={<MyOrders2 />} />
					<Route path="/profile/vendor/:id/stats" element={<Stats />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
