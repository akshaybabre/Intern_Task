import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { gsap } from 'gsap';
import { Mail, Lock, Chrome, ArrowLeft, Shield } from 'lucide-react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().min(6).required('Password is required'),
});

export default function LoginPage() {
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.login-form', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
    });
    return () => ctx.revert();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google Sign-In User Details:', {
        name: user.displayName,
        email: user.email,
        uid: user.uid
      });

      localStorage.setItem('Admin Name', user.displayName || user.email || 'Admin');
      navigate('/dashboard');
    } catch (error) {
      console.error('Google Sign-In error:', error.message);
      alert('Failed to sign in with Google: ' + error.message);
    }
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log('Manual Login User Details:', {
      email: values.email,
      password: values.password // Note: Password should not be logged in production
    });

    localStorage.setItem('Admin Name', values.email);
    navigate('/dashboard');
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div ref={formRef} className="login-form max-w-md w-full">
        <div className="bg-white rounded-xl shadow-md px-6 py-8 space-y-4">
          <div>
            <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>

          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-2">
              <Shield className="text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Zyon Admin</h1>
            </div>
            <h2 className="text-lg font-semibold">Welcome back!</h2>
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

          <Formik initialValues={{ email: '', password: '' }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
            {({ errors, touched }) => (
              <Form className="space-y-3 text-sm">
                {[
                  { name: 'email', icon: Mail, type: 'email', placeholder: 'Email Address' },
                  { name: 'password', icon: Lock, type: 'password', placeholder: 'Password' },
                ].map(({ name, icon: Icon, type, placeholder }) => (
                  <div key={name}>
                    <div className="relative">
                      <Icon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
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
                  Sign In
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-center text-xs text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}