import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import AccountTypeToggle from "../components/AccountTypeToggle";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("user");
  const [name, setName] = useState(""); // full_name OR business_name
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs = {};
    if (name.trim().length < 2) errs.name = "Please enter at least 2 characters";
    if (!email.includes("@")) errs.email = "Enter a valid email";
    if (password.length < 6) errs.password = "At least 6 characters";
    // Confirm Password is in the Figma; the backend doesn't check it, so we
    // do it here on the client before sending.
    if (password !== confirm) errs.confirm = "Passwords do not match";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      // The backend expects full_name for customers, business_name for
      // businesses - so we send the right key based on the toggle.
      const fields =
        accountType === "business"
          ? { business_name: name, email, password, phone_number: phone }
          : { full_name: name, email, password, phone_number: phone };

      await register({ accountType, ...fields });
      navigate(accountType === "business" ? "/dashboard" : "/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard>
      <h1 className="mb-6 text-center text-xl font-semibold text-gray-800">
        Create your account
      </h1>

      <AccountTypeToggle value={accountType} onChange={setAccountType} />
      <Alert>{error}</Alert>

      <form onSubmit={handleSubmit}>
        <FormInput
          label={accountType === "business" ? "Business name" : "Full name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={fieldErrors.name}
          placeholder={accountType === "business" ? "Quickmart Kilimani" : "Jane Doe"}
        />
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <FormInput
          label="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="0712345678"
          required={false}
        />
        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
          placeholder="••••••••"
          autoComplete="new-password"
        />
        <FormInput
          label="Confirm password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={fieldErrors.confirm}
          placeholder="••••••••"
          autoComplete="new-password"
        />

        <Button type="submit" loading={loading}>
          REGISTER
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-brand-dark hover:underline">
          Log in
        </Link>
      </p>
    </AuthCard>
  );
}
