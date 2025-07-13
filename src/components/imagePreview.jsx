import React from "react";

const imagePreview = ({ file }) => {
    if(!file) return null

    return(
        <div className="mb-3">
            <label className="form-label"> Preview Gambar Baru:</label><br />
            <img 
            src={URL.createObjectURL(file)} 
            alt="Preview Baru"
            className="img-thumbnail"
            style={{ maxWidth:'200px'}}
            />
        </div>
    )
}

export default imagePreview