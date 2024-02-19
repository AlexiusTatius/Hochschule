import { useState } from 'react'

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email, username, password);
    }

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Sign up</h3>
            
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

            <button>Sign up</button>
        </form>
    )
}

export default Signup;