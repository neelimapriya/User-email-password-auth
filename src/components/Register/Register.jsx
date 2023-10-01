import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye,FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess]=useState('')
  const [showPassword, setShowPassword]=useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const name =e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted =e.target.terms.checked;
    console.log(name,email, password, accepted);

      // reset error and success
      setRegisterError("");
      setSuccess(' ')

    if(password.length <6){
        setRegisterError('Password must be at least 6 characters or longer');
        return;
    }
    else if(!/[A-Z]/.test(password)){
        setRegisterError('Your Password Should have at least one upper case character')
        return;
    }
    else if(!accepted){
        setRegisterError('Please accept our terms and condition')
        return;
    }

  

    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess('user creater successfully')

        // update profile
        updateProfile(result.user, {
          displayName:name,
          photoURL:"https://example.com/jane-q-user/profile.jpg"
        }).then(()=>{
          console.log('profile updated')
        }).catch(error=>{
          console.log(error)
        })

        // send verification email
        sendEmailVerification(result.user)
        .then(()=>{
          alert('please check your email and verify your account')
        })
      })
      .catch((error) => {
        console.error(error)
        setRegisterError(error.message );
      });
  };

  return (
    <div>
      <h2 className="text-3xl">Please register</h2>
      <div>
        <form onSubmit={handleSubmit} className="my-5">
          <input
            className="w-3/4 mb-5 py-2 px-4"
            placeholder="your name"
            type="text"
            name="name"
            required
          />
          <br></br>
          <input
            className="w-3/4 py-2 px-4"
            placeholder="your email"
            type="email"
            name="email"
            required
          />
          <br></br>

        <div className="relative mt-5">
        <input
            className=" w-3/4 py-2 px-4"
            type={showPassword ? "text": "password"}
            placeholder="password"
            name="password"
            required
          />
          <span className="text-2xl absolute top-2 left-2" onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash></FaEyeSlash>: <FaEye></FaEye>}</span>
        </div>

        <div className="mt-5 space-x-3">
            <input type="checkbox" name='terms' id="terms" />
            <label htmlFor="terms">Accept our terms and condition</label>
        </div>

          <br />
          <input
            className="btn w-3/4 mt-5 btn-secondary"
            type="submit"
            value="register"
          />
        </form>
        {
        registerError && <p className="text-red-600">{registerError}</p>
        }
        {
            success && <p className="text-green-600">{success}</p>
        }
        <p>Already have an account? Please <Link className="text-blue-700" to='/login'>Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
