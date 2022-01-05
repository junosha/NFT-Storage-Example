import { useState } from "react";

import "./styles/App.css";

function App() {
  const formData = new FormData();
  const [imageFile, setImageFile] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // This function handles appending of images to an array
  const handleChange = (e) => {
    e.preventDefault();
    const files = e.target.files;

    if (files) {
      setImageFile(Array.from(files));
    }
  };

  // This function handles the submitting of images
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // This appends the image to a formdata so that nft.storage knows that it's an image
    imageFile.map((image) => {
      formData.append("file", image);
    });

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_NFT_STORAGE_API_KEY}`,
      },
      body: formData,
    };

    fetch("https://api.nft.storage/upload", options)
      .then((response) => response.json())
      .then((response) => setLoading(false));
  };

  const RenderImageSelect = () => {
    return (
      <div>
        <div className="image-select">
          <p className="image-title">Select single image: </p>
          <input type="file" onChange={handleChange} className="filetype" id="group_image" />
        </div>

        <div className="image-select">
          <p className="image-title">Select multiple images: </p>
          <input type="file" multiple onChange={handleChange} className="filetype" id="group_image" />
        </div>
      </div>
    );
  };

  return (
    <section className="App">
      <div className="App-header">
        {!isLoading ? (
          <div>
            <RenderImageSelect />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        ) : (
          <p>Submitting image to NFT.storage...</p>
        )}
      </div>
    </section>
  );
}

export default App;
