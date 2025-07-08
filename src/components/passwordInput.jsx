import { useState } from 'react';

function PasswordInput({ value, onChange, disabled }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-wrapper">
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        className="form-control"
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <span
        className="toggle-password"
        onClick={() => setShowPassword(!showPassword)}
        style={{ cursor: 'pointer' }}
      >
        {showPassword ? "🙈" : "👁️"}
      </span>
    </div>
  );
}

export default PasswordInput;
