import { useEffect, useState } from "react";
import "./Publish.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import Dropzone from "react-dropzone";

const Publish = ({ publishParams }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [brand, setBrand] = useState("");
  const [height, setHeight] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");
  const [exchange, setExchange] = useState(false);
  const [preview, setPreview] = useState();

  const navigate = useNavigate();

  const token = Cookies.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("condition", state);
    formData.append("city", place);
    formData.append("brand", brand);
    formData.append("size", height);
    formData.append("color", color);
    formData.append("picture", picture);

    try {
      await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/");
    } catch (err) {
      if (err.response.status === 500) {
        console.error("An error occurred");
      } else {
        console.error(err.response.data.msg);
      }
    }
  };

  useEffect(() => {
    if (!picture) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(picture);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [picture]);

  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="Publish">
        <div className="publish-container">
          <h2>Vends ton article</h2>
          <form onSubmit={handleSubmit}>
            <div className="file-select">
              <div
                className={
                  !preview ? "dashed-preview-without" : "dashed-preview-image"
                }
              >
                <img src={preview} alt="" />
                {preview && (
                  <div
                    onClick={() => {
                      setPreview(undefined);
                      setPicture(undefined);
                    }}
                    className="remove-img-button"
                  >
                    X
                  </div>
                )}
                {!preview && (
                  <Dropzone onDrop={(files) => setPicture(files[0])}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="input-design-default">
                        <label htmlFor="file" className="label-file">
                          <span className="input-sign">+</span>
                          <span>Ajoute une photo</span>
                        </label>
                        <input
                          {...getInputProps()}
                          type="file"
                          id="file"
                          className="input-file"
                          onChange={(e) => {
                            setPicture(e.target.files[0]);
                          }}
                        />
                      </div>
                    )}
                  </Dropzone>
                )}
              </div>
            </div>

            <div className="text-input-section">
              <div className="text-input">
                <h4>Titre</h4>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="ex: Chemise Sézane verte"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="text-input">
                <h4>Décris ton article</h4>
                <textarea
                  name="description"
                  id="description"
                  rows="5"
                  placeholder="ex: porté quelquefois, taille correctement"
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>

            <div className="text-input-section">
              <div className="text-input">
                <h4>Marque</h4>
                <input
                  type="text"
                  id="selectedBrand"
                  name="selectedBrand"
                  placeholder="ex: Zara"
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                />
              </div>
              <div className="text-input">
                <h4>Taille</h4>
                <input
                  type="text"
                  id="selectedSize"
                  name="selectedSize"
                  placeholder="ex: L / 40 / 12"
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value);
                  }}
                />
              </div>
              <div className="text-input">
                <h4>Couleur</h4>
                <input
                  type="text"
                  id="color"
                  name="color"
                  placeholder="ex: Fushia"
                  value={color}
                  onChange={(e) => {
                    setColor(e.target.value);
                  }}
                />
              </div>
              <div className="text-input">
                <h4>Etat</h4>
                <input
                  name="wearRate"
                  id="wearRate"
                  placeholder="Neuf avec étiquette"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                />
              </div>
              <div className="text-input">
                <h4>Lieu</h4>
                <input
                  name="city"
                  id="city"
                  placeholder="ex: Paris"
                  value={place}
                  onChange={(e) => {
                    setPlace(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="text-input-section">
              <div className="text-input">
                <h4>Prix</h4>
                <div className="checkbox-section">
                  <input
                    type="text"
                    id="price"
                    name="price"
                    placeholder="0,00 €"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                  <div className="checkbox-input">
                    <label
                      htmlFor="exchange"
                      className={
                        !exchange
                          ? "checkbox-design"
                          : "checkbox-design-checked"
                      }
                      onClick={() => {
                        setExchange(!exchange);
                      }}
                    ></label>
                    <input
                      type="checkbox"
                      name="exchange"
                      id="exchange"
                      value={exchange}
                    />
                    <span>Je suis intéressé(e) par les échanges</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-button-div">
              <button type="submit" className="form-validation">
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};
export default Publish;
