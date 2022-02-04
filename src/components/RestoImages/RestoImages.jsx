import React, { useState } from "react";

export default function RestoImages() {
    return(
          <div>
            <label >Imágenes</label>
            <input
              type="file"
              placeholder="Cargue su imagen"
              name="images"
              value={owner.images}
              autoComplete="off"
              multiple
              onChange={(e) => handleChange(e)}
            />
          </div>
    )
}