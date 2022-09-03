import React, {useState} from 'react'
import {useNavigate} from 'react-router'

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        artist: "",
        released: "",
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
        console.log(newAlbum)
        await fetch("http://localhost:4000/albums/add", {
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
        setForm({name: "",artist: "",released: "",rating: "",language: ""})
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
                <div className="form-group">
                    <label htmlFor="artist">Artist</label>
                    <input
                        type="text"
                        className="form-control"
                        id="artist"
                        value={form.artist}
                        onChange={(e) => updateForm({ artist: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="released">Release Date</label>
                    <input
                        type="text"
                        className="form-control"
                        id="released"
                        value={form.released}
                        onChange={(e) => updateForm({ released: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <input
                        type="text"
                        className="form-control"
                        id="rating"
                        value={form.rating}
                        onChange={(e) => updateForm({ rating: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="language">Language</label>
                    <input
                        type="text"
                        className="form-control"
                        id="language"
                        value={form.language}
                        onChange={(e) => updateForm({ language: e.target.value })}
                    />
                </div>
                <br />
                <div className="form-group">
                    <input
                        type="submit"
                        value="Add Album"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    )
}
