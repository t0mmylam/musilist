import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../logsign/logsign.css'

export default function Add() {
    const [getImageFile, setImageFile] = useState([])
    const [form, setForm] = useState({
        name: "",
        artist: "",
        language: "",
        genre: "",
        released: "",
        image: "",
    })
    const navigate = useNavigate()
    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value}
        })
    }

    const handleImageFile = (e) => {
        setImageFile([...getImageFile, e.target.files[0]])
    }

    const handleSubmit = async function(e) {
        e.preventDefault()
        let fileName = form.name.replace(' ', '')+form.artist.replace(' ', '')+'.jpeg'
        const file = new File(getImageFile, fileName)
        let body = new FormData()
        body.append('file', file, fileName)
        console.log(body.getAll('file'))
        await fetch("http://localhost:4000/upload", {
            method: "POST",
            body: body
        })
        .catch(error => {
            window.alert(error)
            return
        })
        form.image = 'https://musilistimages.s3.amazonaws.com/albums/'+fileName
        form.image.replace(' ', '')
        const newAlbum = {...form}
        fetch("http://localhost:4000/api/albums/add", {
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
        setForm({name: "",artist: "",language: "",genre: "",released: "",image: "",})
        navigate("/")
    }

    return (
        <div className="form container">
            <h3>Add Album</h3>
            <form id="login" onSubmit={handleSubmit}>
                <input value={form.name} onChange={(e) => updateForm({ name : e.target.value})} required type="Text" placeholder="Name" className="ml-input" autoComplete="off"></input>
                <input value={form.artist} onChange={(e) => updateForm({ artist : e.target.value})} required type="Text" name="artist"  placeholder="Artist" className="ml-input" autoComplete="off"></input>
                <input value={form.language} onChange={(e) => updateForm({ language : e.target.value})} required type="Text" name="language"  placeholder="Language" className="ml-input" autoComplete="off"></input>
                <input value={form.genre} onChange={(e) => updateForm({ genre : e.target.value})} required type="Text" name="genre"  placeholder="Genre" className="ml-input" autoComplete="off"></input>
                <input value={form.released} onChange={(e) => updateForm({ released : e.target.value})} required type="Date" name="released"  placeholder="Release Date" className="ml-input" autoComplete="off"></input>
                <input onChange={handleImageFile} required name="file" title="Cover" type="file" accept="image/*"></input>
            </form>
            <button type="submit" form="login" value="Submit">Add Album</button>
        </div>
    )
}