import { useState } from "react";
import noimage from "../images/noimage.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddNewRecipes ( ) {

    const [newRecipe, setNewRecipe] = useState ('')
    const [image, setImage] = useState({
        url: noimage,
        file: null,
      });

      const handleImageChange = (e) => {
        console.log("the file is", e.currentTarget.files[0]);
    
        if (!e.currentTarget.files[0]) return;
    
        if (e.currentTarget.files[0].size > 1000000) {
          alert("This file is bigger than 10kB");
          return;
        }
        setImage({
          url: URL.createObjectURL(e.currentTarget.files[0]),
          file: e.currentTarget.files[0],
        });
      };

    return(
        <div>
                  <div>
        <label className="cursor-pointer">
          Select your Profile image
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/png, image/jpeg"
          />
        </label>
      </div>
           <div>
        <img
          className="w-[300px] h-[300px] object-cover"
          src={image.url || noimage}
          alt=""
        />
      </div>
        </div>
    )
}