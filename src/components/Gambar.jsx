import React, { useState } from "react";
import './Gambar.css';

export default function Gambar() {
    const [gambar, setGambar] = useState(false);
    const toggleGambar = () => {
        setGambar(!gambar);
    };

    if(gambar) {
        document.body.classList.add('active-gambar');
    } else {
        document.body.classList.remove('active-gambar');
    }

    return (
        <>
            <button onClick={toggleGambar}>
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" 
                     src="https://tse2.mm.bing.net/th?id=OIP.q0vC3o4GLpNUNU2msVuj9gHaFj&pid=Api&P=0&h=180" 
                     alt="Sample" />
            </button>

            {gambar && (
                <div className="overlay" onClick={toggleGambar}>
                    <div className="modal">
                        <img className="w-200px h-200px" 
                             src="https://tse2.mm.bing.net/th?id=OIP.q0vC3o4GLpNUNU2msVuj9gHaFj&pid=Api&P=0&h=180" 
                             alt="Sample" />
                        <button onClick={toggleGambar}>
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
