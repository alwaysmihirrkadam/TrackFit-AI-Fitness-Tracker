import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.name);
      toast.success("Login Successful 🎉");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submitHandler} className=" bg-[#17212b] text-center text-white shadow-xl p-5 md:p-6 rounded-2xl w-[92%] max-w-md border border-slate-700">
        <h1 className="text-2xl font-bold mb-5">LOGIN</h1>
        <input value={formData.email} type="email" placeholder="Email" className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white mb-3 " onChange={(e) => setFormData({ ...formData, email: e.target.value, })} />
        <input value={formData.password} type="password" placeholder="Password" className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white mb-3 " onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-xl font-semibold mt-2 transition-all ${loading
            ? "bg-slate-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {loading ? "Loggin in..." : "Login"}
        </button>
        <p>Don't have an account? <button onClick={() => navigate('/register')} className='text-lg cursor-pointer h-fit underline'>Register</button></p>
      </form>
    </div>
  );
}

export default Login;