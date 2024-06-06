import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ModalEdit({ isOpen, closeModal, judulModal, inputData, endpoints }) {
    if (!isOpen) {
        return null;
    }

    const [dataDetail, setDataDetail] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isOpen) return;

        axios.get(endpoints['detail'], {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        .then((res) => {
            setDataDetail(res.data.data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching data:", err);
            setLoading(false);
        });
    }, [isOpen, endpoints]);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setDataDetail(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    function handleUpdate(e) {
        e.preventDefault();
        console.log("Data to be sent:", dataDetail); 
        axios.patch(endpoints["update"], dataDetail, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
        })
        .then((res) => {
            window.location.reload();
        })
        .catch((err) => {
            console.error("Error updating data:", err.response.data); 
            setErrorMessage(err.response.data.message || "An error occurred");
        });
    }

    return (
        <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit Data {judulModal}
                        </h3>
                        <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <>
                                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                                <form className="space-y-4" onSubmit={handleUpdate}>
                                    {Object.entries(inputData).map(([key, item]) => (
                                        <div className="mb-6" key={key}>
                                            <label htmlFor={key} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{key}</label>
                                            {item.type === "select" ? (
                                                <select
                                                    id={key}
                                                    name={key}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    value={dataDetail[key] || ''}
                                                    onChange={handleInputChange}
                                                >
                                                    <option hidden selected disabled>{key}</option>
                                                    {item.options.map((opt, idx) => (
                                                        <option key={idx} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={item.type}
                                                    name={key}
                                                    id={key}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    value={dataDetail[key] || ''}
                                                    onChange={handleInputChange}
                                                />
                                            )}
                                        </div>
                                    ))}
                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update data</button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
