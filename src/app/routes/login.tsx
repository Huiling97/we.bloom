import { useState, type ChangeEvent, type FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../store/auth-context';

const BASE_URL = 'http://localhost:5000';

const Login = () => {
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);

  const [phoneInput, setPhoneInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [hasPhone, setHasPhone] = useState(false);

  const sendCode = async () => {
    try {
      await axios.get(`${BASE_URL}/sendCode?phone=${phoneInput}`);
    } catch (e) {
      console.log(e);
      throw new Error('Send code failed');
    }
  };

  const verifyCode = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/verifyCode?phone=${phoneInput}&code=${codeInput}`
      );
      if (response.status === 200) {
        setIsAuthenticated(true);
        navigate('/manage');
      }
      console.log(response);
    } catch (e) {
      console.log(e);
      throw new Error('Verify code failed');
    }
  };

  const phoneChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneInput(e.target.value);
  };

  const codeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCodeInput(e.target.value);
  };

  const onSubmitPhone = (e: FormEvent) => {
    e.preventDefault();
    sendCode();
    setHasPhone(true);
  };

  const onSubmitCode = (e: FormEvent) => {
    e.preventDefault();
    verifyCode();
  };

  return (
    <div>
      {hasPhone ? (
        <form onSubmit={onSubmitCode}>
          <label htmlFor='code'>Please enter the OTP</label>
          <input
            type='number'
            id='code'
            name='code'
            value={codeInput}
            onChange={codeChangeHandler}
          ></input>
          <button type='submit'>Submit</button>
        </form>
      ) : (
        <form onSubmit={onSubmitPhone}>
          <label htmlFor='phone'>Please enter your phone number</label>
          <input
            type='tel'
            id='phone'
            name='phone'
            pattern='[0-9]{8}'
            maxLength={8}
            value={phoneInput}
            onChange={phoneChangeHandler}
          ></input>
          <button type='submit'>Submit</button>
        </form>
      )}
    </div>
  );
};

export default Login;
