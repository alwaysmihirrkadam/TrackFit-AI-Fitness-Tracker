import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", age: "" });
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/api/auth/register`,
        formData
      );      
      console.log("Sending token:", res.data.token);
      console.log(res.data);
      console.log(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.name);
      toast.success("Account Created Successfully 🎉");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white min-h-screen flex items-center justify-center">
      <form onSubmit={submitHandler} className="bg-[#17212b] text-center shadow p-6 rounded w-96">
        <h1 className="text-2xl font-bold mb-5">REGISTER</h1>
        <input value={formData.name} type="text" placeholder="Name" className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white mb-3 " onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input value={formData.email} type="email" placeholder="Email" className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white mb-3 " onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input value={formData.password} type="password" placeholder="Password" className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white mb-3 " onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <input value={formData.age} type="number" placeholder="Age" className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white mb-3 " onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-xl font-semibold mt-2 transition-all ${loading
            ? "bg-slate-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
        <p>Already have an account? <button onClick={() => navigate('/login')} className='text-lg cursor-pointer h-fit underline'>Log In</button></p>
      </form>
    </div>
  );
}

export default Register;