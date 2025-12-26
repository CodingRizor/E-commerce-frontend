import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Profile() {

    const { user, setUser } = useContext(AuthContext);
    // const [user, setUser] = useState({});

    const [name, setName] = useState("");
    const [profileUrl, setProfileUrl] = useState("");
    const [profileFile, setProfileFile] = useState(null);

    const fetchProfile = async () => {
        let BACKEND_URL = "http://localhost:5000/api/v1/user/profile"
        const res = await axios.get(BACKEND_URL, {
            method: "GET",
            withCredentials: true
        });
        if (res.status == 200) {
           
            setUser(res.data.user)
            setName(res.data.user.name)
            setProfileUrl(res.data.user?.profile?.url || "")
            localStorage.setItem("user", JSON.stringify(res.data.user));
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])



    const editFormSubmit = async (e) => {
        e.preventDefault();

        let BACKEND_URL = "http://localhost:5000/api/v1/user/upload-profile"
        try {

            const form = new FormData();
            form.append("name", name)
            if (profileFile) {
      form.append("user_profile", profileFile);
    }
            const res = await axios.post(BACKEND_URL, form, {
                method: "POST",
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            if (res.status === 200) {
                setUser(res.data.user);
                setProfileUrl(res.data.user.profile.url);
                document.getElementById("my_modal_1").close();
            }
        } catch (error) {
            console.log("Profile upload error : ", error);
        }

    }
    return (
        <div>
            <img src={profileUrl || "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"} alt="" style={{ width: 80, height: 80 }} />
            <h1>{user?.name}</h1>
            <h1>{user?.email}</h1>

            <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>open modal</button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">EDIT PROFILE</h3>
                    <form onSubmit={editFormSubmit}>
                        <input type='text' className='input' value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="file" className='file-input file-input-success' onChange={(e) => setProfileFile(e.target.files[0])} accept='.png,.jpg,.jpeg' />
                        <button className='btn' type='submit'>Edit</button>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Profile