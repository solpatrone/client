// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import ReactPaginate from 'react-paginate';



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
//   }