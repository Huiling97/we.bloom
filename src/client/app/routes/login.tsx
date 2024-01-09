import {
  useState,
  type ChangeEvent,
  type FormEvent,
  useContext,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { ArrowBackOutline } from '@styled-icons/evaicons-outline';
import isDevEnv from '../util/is-dev-env';
import { AuthContext } from '../store/auth-context';
import { isPhoneValid } from '../util/phone-helper';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const BASE_URL = isDevEnv
  ? 'http://localhost:5000'
  : import.meta.env.VITE_BASE_API_URL;

const Login = () => {
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);

  const [phoneInput, setPhoneInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [hasPhone, setHasPhone] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const [codeError, setCodeError] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setIsResendDisabled(false);
            return 30;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    if (!isResendDisabled) {
      return clearInterval(interval);
    }
  }, [isResendDisabled]);

  const sendCode = async () => {
    if (phoneInput) {
      try {
        await axios.get(`${BASE_URL}/sendCode?phone=${phoneInput}`);
      } catch (e) {
        throw new Error('Send code failed');
      }
    }
  };

  const verifyCode = async () => {
    if (codeInput) {
      try {
        const response = await axios.get(
          `${BASE_URL}/verifyCode?phone=${phoneInput}&code=${codeInput}`
        );
        if (response.status === 200) {
          setIsAuthenticated(true);
          navigate('/manage');
        }
      } catch (e) {
        setCodeError('Invalid code');
        throw new Error('Verify code failed');
      }
    }
  };

  const phoneChangeHandler = (phone: string) => {
    setPhoneInput(phone);
    if (codeError && !isPhoneValid(phone)) {
      setCodeError('Invalid phone number');
    } else {
      setCodeError('');
    }
  };

  const codeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCodeInput(e.target.value);
  };

  const codeKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmitCode(e);
    }
  };

  const onSubmitPhone = (e: FormEvent) => {
    e.preventDefault();
    if (!isPhoneValid(phoneInput)) {
      setCodeError('Invalid phone number');
    } else {
      setCodeError('');
      setHasPhone(true);
      sendCode();
      setIsResendDisabled(true);
    }
  };

  const onSubmitCode = (e: FormEvent) => {
    e.preventDefault();
    verifyCode();
  };

  const onResendCode = () => {
    setIsResendDisabled(true);
    setTimer(30);
    sendCode();
  };

  const backHandler = () => {
    setPhoneInput('');
    setCodeInput('');
    setCodeError('');
    setHasPhone(false);
    setIsResendDisabled(false);
  };

  return (
    <div>
      {hasPhone ? (
        <div className='login-form-container'>
          <form onSubmit={onSubmitCode} className='form' noValidate>
            <button className='button-plain button-back' onClick={backHandler}>
              <ArrowBackOutline size='24' />
              Back
            </button>

            <div className='form-title'>Confirm your phone number</div>
            <div className='form-subtitle'>
              {`We just sent a code to ${phoneInput}, enter it below`}
            </div>
            <label htmlFor='code'>Code</label>
            <input
              type='number'
              id='code'
              name='code'
              required
              value={codeInput}
              onChange={codeChangeHandler}
              onKeyDown={codeKeyDownHandler}
              className={codeError ? 'error-input' : ''}
            />
            {codeError && <div className='error-message'>{codeError}</div>}
            <Button type='submit'>Verify now</Button>
            <div className='resend-button-container'>
              {isResendDisabled &&
                `Did not receive the code? Retry in ${timer} seconds`}
              <button
                disabled={isResendDisabled}
                className='button-plain underline'
                onClick={onResendCode}
              >
                Resend code
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className='login-form-container'>
          <form onSubmit={onSubmitPhone} className='form' noValidate>
            <div className='form-title'>Verify you are real</div>
            <div className='form-subtitle'>
              Enter your phone number to receive a SMS verification code.
            </div>
            <div>Phone Number</div>
            <PhoneInput
              defaultCountry='sg'
              value={phoneInput}
              onChange={(phoneInput) => phoneChangeHandler(phoneInput)}
              inputStyle={{ width: '100%' }}
            />
            {codeError && <div className='error-message'>{codeError}</div>}
            <Button type='submit'>Send code</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
