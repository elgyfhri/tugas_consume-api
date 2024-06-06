import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [inputData, setInputData] = useState({
        email: '',
        password: '',
    });

    const [errorData, setErrorData] = useState([]);
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        axios.post('http://localhost:8000/login', inputData)
            .then(res => {
                localStorage.setItem('access_token', res.data.data.access_token)
                navigate('/profile')
                // console.log(res);
            })
            .catch(err => {
                setErrorData(err.response.data);
            });
    }

    return (
        <div>
            <Navbar />
            <section className="bg-gray-50 dark:bg-gray-900 mt-8">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-40 grid lg:grid-cols-2 gap-8 lg:gap-16">
                    <div className="flex flex-col justify-center">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                            Welcome, please login first
                        </h1>
                        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"></p>
                        <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">
                            {
                                Object.keys(errorData).length > 0 ? (
                                    <div class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                        <svg class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                        </svg>
                                        <span class="sr-only">Danger</span>
                                        <div>
                                            <span class="font-medium">Gagal Login</span>
                                            <ul class="mt-1.5 list-disc list-inside">
                                                {
                                                    Object.entries(errorData).map(([index, value]) =>(
                                                       <li key={index}>{value}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                ) : ''
                        }
                            <svg
                                className="w-3.5 h-3.5 ml-2 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </a>
                    </div>
                    <div>
                        <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Sign in to Inventaris
                            </h2>
                            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-start">
                                    <a
                                        href="#"
                                        className="ml-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        Lost Password?
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Login to your account
                                </button>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    Not registered yet?{" "}
                                    <a
                                        href="#"
                                        className="text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        Create account
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}