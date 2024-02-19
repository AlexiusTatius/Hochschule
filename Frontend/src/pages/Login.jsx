import { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email, username, password);
    }

    return (
        <form className='Login' onSubmit={handleSubmit}>
            <h3>Log in</h3>
            
            <label>Email: </label>
            <input
                type="email"
                onchange={(event) =>{setEmail(event.target.value)}}
                value={email}
            />
            <label>Username</label>
            <input
                type="text"
                onchange={(event) =>{setEmail(event.target.value)}}
                value={username}
            />
            <label>Password:</label>
            <input
                type="password"
                onchange={(event) =>{setPassword(event.target.value)}}
                value={password}
            />
            <button>Log in</button>
        </form>
    )
}

export default Login;