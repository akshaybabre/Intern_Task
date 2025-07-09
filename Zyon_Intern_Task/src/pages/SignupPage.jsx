import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { gsap } from 'gsap';
import { Shield, Mail, Lock, Chrome, ArrowLeft, User, Phone } from 'lucide-react';
import { auth, googleProvider } from '../firebase'; // Import Firebase
import { signInWithPopup } from 'firebase/auth';

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().min(2).required('Full name is required'),
  email: Yup.string().email().required('Email is required'),
  mobile: Yup.string().matches(/^[0-9]{10}$/).required('Mobile is required'),
  password: Yup.string().min(8).matches(/[A-Z]/).matches(/[a-z]/).matches(/[0-9]/).required(),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')]).required(),
});

export default function SignupPage() {
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.signup-form', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
    });
    return () => ctx.revert();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google Sign-In successful:', user);

      localStorage.setItem('Admin Name', user.displayName || 'Admin');

      await fetch('http://localhost:5000/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email
        })
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Google Sign-In error:', error.message);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:5000/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.fullName,
          email: values.email,
          mobile: values.mobile,
          password: values.password
        })
      });

      if (!response.ok) {
        throw new Error('Failed to store admin data');
      }

      console.log('Admin name saved!');
      localStorage.setItem('Admin Name', values.fullName);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving admin:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div ref={formRef} className="signup-form max-w-md w-full">
        <div className="bg-white rounded-xl shadow-md px-6 py-8 space-y-4">
          <div className="mb-2">
            <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>

          <div className="text-center mb-4">
            <div className="flex justify-center items-center gap-2 mb-2">
              <Shield className="text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Zyon Admin</h1>
            </div>
            <h2 className="text-lg font-semibold">Create your account</h2>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 border rounded-md py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <Chrome size={18} className="text-blue-600" />
            Continue with Google
          </button>

          <div className="flex items-center gap-2 text-gray-400 text-xs my-2">
            <hr className="flex-grow border-gray-300" />
            <span>OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <Formik
            initialValues={{ fullName: '', email: '', mobile: '', password: '', confirmPassword: '' }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-3 text-sm">
                {[
                  { name: 'fullName', icon: User, type: 'text', placeholder: 'Full Name' },
                  { name: 'email', icon: Mail, type: 'email', placeholder: 'Email Address' },
                  { name: 'mobile', icon: Phone, type: 'text', placeholder: 'Mobile Number' },
                  { name: 'password', icon: Lock, type: 'password', placeholder: 'Password' },
                  { name: 'confirmPassword', icon: Lock, type: 'password', placeholder: 'Confirm Password' },
                ].map(({ name, icon: Icon, type, placeholder }) => (
                  <div key={name}>
                    <div className="relative">
                      <Icon className="absolute left-3 top-2.5 h-4 w-карп w-4 text-gray-400" />
                      <Field
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        className={`w-full pl-10 pr-3 py-2 rounded-md border text-sm outline-none transition ${
                          touched[name] && errors[name]
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      />
                    </div>
                    <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold"
                >
                  Create Account
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-center text-xs text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}