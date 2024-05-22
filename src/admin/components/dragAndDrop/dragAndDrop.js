import React, { useRef, useState } from "react";
import "./drag.css";
import { IoIosClose } from "react-icons/io";
import { IoIosImages } from "react-icons/io";

export default function Drag({ setUploadImage, images, setImages }) {
  // const [images, setImages] = useState([]);
  const fileInputRef = useRef();
  const [uploadButton, setUploadButton] = useState(false);
  const selectFile = () => {
    fileInputRef.current.click();
  };

  const handleDone = () => {
    setUploadButton(true);
    setUploadImage(false);
  };

  const onFileSelect = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      console.log("File Type:", files[i].type.split("/")[0]);

      if (files[i].type.split("/")[0] !== "image") {
        console.log("Not an image. Skipping.");
        continue;
      }

      setImages(e.target.files)
 
        // setImages((prevImages) => [
        //   ...prevImages,
        //   {
        //     name: files[i].name,
        //     url: URL.createObjectURL(files[i]),
        //   },
        // ]);
     
    }
  };

  const deleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, id) => id != index));
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  };

  return (
    <div className="dragandDrop">
      <span>
        <IoIosClose
          className="fs-2"
          style={{ cursor: "pointer" }}
          onClick={() => setUploadImage(false)}
        />
      </span>
      <div
        className="drop-containor "
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <span className="drag-icon">
          <IoIosImages />
        </span>
        <span>
          <p className="text-secondary fw-bold">
            Drop your images here, or
            <span
              role="button"
              onClick={selectFile}
              className="text-success text-decoration-underline"
            >
              {" "}
              browse
            </span>
          </p>
        </span>
        <input
          type="file"
          name="file"
          className="file"
          multiple
          ref={fileInputRef}
          onChange={onFileSelect}
        />
        <span className="text-secondary" style={{ fontSize: "14px" }}>
          (upload maximum 4 photos)
        </span>
      </div>

      {images && (
        <div className="droped-img">
          {images.map((images, index) => (
            <div className="selcted-img" key={index}>
              <span className="close-button" onClick={() => deleteImage(index)}>
                <IoIosClose />
              </span>
              <img src={images.url} />
            </div>
          ))}
        </div>
      )}

      <button className="btn btn-success m-3" onClick={handleDone}>
        Done
      </button>
    </div>
  );
}
