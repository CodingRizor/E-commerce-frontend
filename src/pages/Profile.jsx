import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
function Profile() {

    const [user, setUser] = useState({});

    const fetchProfile = async () => {
        let BACKEND_URL = "http://localhost:5000/api/v1/user/profile"
        const res = await axios.get(BACKEND_URL, {
            method: "GET",
            withCredentials: true
        });
        if (res.status == 200) {
            setUser(res.data.user)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    return (
        <div>
            {/* <img src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" alt="" /> */}
            <h1>{user?.name}</h1>
            <h1>{user?.email}</h1>
        </div>
    )
}

export default Profile