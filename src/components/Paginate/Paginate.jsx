import React from "react";

export default function Paginate({ restosPerPage, allRestaurants, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allRestaurants.length / restosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul>
        {pageNumbers &&
          pageNumbers.map((p) => (
            <li key={p}>
              <span onClick={() => paginado(p)}>
                {p}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
