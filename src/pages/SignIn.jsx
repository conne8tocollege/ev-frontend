import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_BASE_URL;

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch(`${apiUrl}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        localStorage.setItem("access_token", data.access_token);
        toast.success("Login successful");
        navigate("/dashboard?tab=dash");
        setFormData({ email: "", password: "" });
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex justify-center items-center my-10 pt-4  md:min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Welcome back!
        </h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Enter your email and password to access your account.
        </p>

        {/* {errorMessage && (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        )} */}

        <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
          <div>
            <Label value="Email" className="mb-1" />
            <TextInput
              type="email"
              placeholder="my@example.com"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label value="Password" className="mb-1" />
            <TextInput
              type="password"
              placeholder="**********"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-orange-400"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Link to="/signup" className="text-sm text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
