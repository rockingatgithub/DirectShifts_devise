import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ReferralList from './Home';
import HomePage from './HomePage';
import DrawerAppBar from './Navbar';
import RefrralSignup from './ReferralSignup';
import Signup from './Signup';
import '../../assets/stylesheets/application.module.css';

// The main app component from where the application starts. It also contains routes for pages available.

function App(props) {

    const [userEmail, setuserEmail] = useState('')
    const [referrals, setReferrals] = useState([])

    return (
        <div>
            <DrawerAppBar userEmail={userEmail} setReferrals={setReferrals} setuserEmail={setuserEmail} />
            <Routes>
                <Route path='/home' element={<ReferralList userEmail={userEmail} referrals={referrals} setReferrals={setReferrals} />} />
                <Route path='/' element={<HomePage setuserEmail={setuserEmail} />} />
                <Route path='/signup' element={<Signup setuserEmail={setuserEmail} />} />
                <Route path='/referral/:referralID' element={<RefrralSignup setuserEmail={setuserEmail} />} />
            </Routes>
        </div>
    );
}

export default App;