import React from "react";
import s from "./Paginate.module.css";

export default function Paginate({ restosPerPage, allRestaurants, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allRestaurants.length / restosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={s.container}>
      <ul className={s.ul}>
        {pageNumbers &&
          pageNumbers.map((p) => (
            <li key={p} className={s.list}>
              <span onClick={() => paginado(p)}>
                {p}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
