import {useState} from "react";
import {useCookies} from 'react-cookie';

const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['AuthToken', 'Email']);
    const [error, setError] = useState(null);
    const [isLogIn, setIsLogIn] = useState(true);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const viewLogIn = (status) => {
        setError(null);
        setIsLogIn(status);
    }

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault();
        if (!isLogIn && password !== confirmPassword) {
            setError('Passwords dont match');
            return;
        }

        console.log('Sending data to server:', { email, password });

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/${endpoint}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const userData = await response.json();

        console.log('Server response:', userData);

        if(!userData){setError(userData.detail)} else {
            //localStorage.setItem('Email', userData.email);
          //  localStorage.setItem('AuthToken', userData.token);
           setCookie('Email', userData.email);
           setCookie('AuthToken', userData.token);

            window.location.reload();
        };

    }

    return (
        <div className='auth-container'>
            <div className='auth-container-box'>
                <form>
                    <h2>{isLogIn ? 'Please log in' : 'Please sign up'}</h2>
                    <input
                        type='email'
                        placeholder='Your email'
                        autoComplete='current-email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Your password'
                        autoComplete='current-password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isLogIn && <input
                        type='password'
                        placeholder='Confirm password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />}
                    <input type='submit' className='create'
                           onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')}/>
                    {error && <p>{error}</p>}
                </form>
                <div className='auth-options'>
                    <button onClick={() => viewLogIn(true)}
                            style={{backgroundColor: isLogIn ? "white" : "darkgrey"}}>Log in
                    </button>
                    <button onClick={() => viewLogIn(false)}
                            style={{backgroundColor: !isLogIn ? "white" : "darkgrey"}}>Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Auth;