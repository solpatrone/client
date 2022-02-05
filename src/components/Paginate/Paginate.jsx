<<<<<<< HEAD
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import ReactPaginate from 'react-paginate';
=======
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import ReactPaginate from "react-paginate";
>>>>>>> develop

// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

// export function Items({ currentItems }) {
//   return (
//     <>
//       {currentItems &&
//         currentItems.map((item) => (
//           <div>
//             <h3>Item #{item}</h3>
//           </div>
//         ))}
//     </>
//   );
// }

<<<<<<< HEAD
// // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,17, 18];

// // export function Items({ currentItems }) {
// //     return (
// //         <>
// //       {currentItems &&
// //         currentItems.map((item) => (
// //             <div>
// //             <h3>Item #{item}</h3>
// //           </div>
// //         ))}
// //     </>
// //   );
// // }

// export default function Paginate({ handlePageClick, pageCount }) {
//     //current rest lo saco del home del useSelector
//   const [currentItems, setCurrentItems] = useState(null);
//     //cant paginas, setPage en linea 36 ceil de todos los rest dividido items por pag
//   const [pageCount, setPageCount] = useState(0);
//     //idex first, setindex modulo de el numero seleccionado * items por pag  con  el largo de allrest
//   const [itemOffset, setItemOffset] = useState(0);

//   useEffect(() => {
//     // idex last
//     const endOffset = itemOffset + itemsPerPage;
//     //items per page
//     setCurrentItems(restaurants.slice(itemOffset, endOffset));
//     //cant pag
//     setPageCount(Math.ceil(restaurants.length / itemsPerPage));
//   }, [itemOffset, itemsPerPage]);

//   // Invoke when user click to request another page. fn
//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % restaurants.length;
    
//     setItemOffset(newOffset);
//   };

//   return (
//     <>
//       {/* <Items currentItems={currentItems} /> */}
=======
// export default function Paginate({ itemsPerPage }) {
//   const owners = useSelector((state) => state.owners);
//   const [currentItems, setCurrentItems] = useState(null);
//   const [pageCount, setPageCount] = useState(0);

//   const [itemOffset, setItemOffset] = useState(0);

//   useEffect(() => {
//     // Fetch items from another resources.
//     const endOffset = itemOffset + itemsPerPage;
//     console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//     setCurrentItems(owners.slice(itemOffset, endOffset));
//     setPageCount(Math.ceil(items.length / itemsPerPage));
//   }, [itemOffset, itemsPerPage]);

//   // Invoke when user click to request another page.
//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % items.length;
//     console.log(
//       `User requested page number ${event.selected}, which is offset ${newOffset}`
//     );
//     setItemOffset(newOffset);
//   };

//   return (
//     <>
//       <Items currentItems={currentItems} />
>>>>>>> develop
//       <ReactPaginate
//         breakLabel="..."
//         nextLabel="next >"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={3}
//         pageCount={pageCount}
//         previousLabel="< previous"
//         renderOnZeroPageCount={null}
//       />
//     </>
//   );
<<<<<<< HEAD
//   }
=======
// }

import React from "react";
import s from "./Paginate.module.css"

export default function Paginate({ restosPerPage, allRestaurants, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allRestaurants.length / restosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className={s.ul}>
        {pageNumbers &&
          pageNumbers.map((p) => (
            <li className={s.list} key={p}>
              <a onClick={() => paginado(p)} href="#">
                {p}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
>>>>>>> develop
