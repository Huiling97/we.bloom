import { useState } from 'react';

const Login = () => {
  const [hasPhone, setHasPhone] = useState(false);

  const onSubmitPhone = () => {
    setHasPhone(true);
  };

  const onSubmitCode = () => {};

  return (
    <div>
      {hasPhone ? (
        <form onSubmit={onSubmitCode}>
          <label htmlFor='code'>Please enter your phone number</label>
          <input type='number' id='code' name='code'></input>
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
          ></input>
          <button type='submit'>Submit</button>
        </form>
      )}
    </div>
  );
};

export default Login;
