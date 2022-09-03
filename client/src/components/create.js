import React, {useState} from 'react'
import {useNavigate} from 'react-router'

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        artist: "",
        releaseDate: "",
        rating: "",
        language: "",
    })
    const navigate = useNavigate()

    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value}
        })
    }

    async function onSubmit(e) {
        e.preventDefault()

        const newAlbum = {...form}

        await fetch("http://localhost:4000/album/add", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(newAlbum),
        })
        .catch(error => {
            window.alert(error)
            return
        })
        setForm({name: "",artist: "",releaseDate: "",rating: "",language: ""})
        navigate("/")
    }

    return (
        <div>
            <h3>Create New Album</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name : e.target.value})}
                    />
                </div>
            </form>
        </div>
    )
}
