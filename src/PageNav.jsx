import React from "react";
import { Link } from "react-router-dom";

/** Component for Jobly pagination
 *
 * props:
 * - totalItems (int)
 * - itemsPerpage (int)
 * - currPage (int)
 * - handlePageNav()
 *
 *
 */
function PageNav({ totalItems, itemsPerPage, handlePageNav, currPage }) {

    const numPages = Math.ceil(totalItems / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= numPages; i++) {
        pages.push(i);
    }

    return (
        <nav aria-label="Page pagination" className="d-flex align-items-center justify-content-center">
            <ul className="pagination">
                <li className={`page-item ${currPage === 1 ? "disabled" : ""}`}>
                    <Link className="page-link" onClick={() =>  handlePageNav(currPage-1)}>&laquo;</Link>
                </li>
                {pages.map((page, idx) => {
                    return (
                        <li className={`page-item ${currPage === page ? "active" : ""}`} key={idx} >
                            <Link className="page-link" onClick={() => handlePageNav(page)}>{page}</Link>
                        </li>
                    );
                })}
                <li className={`page-item ${currPage === numPages ? "disabled" : ""}`}>
                    <Link className="page-link" onClick={() =>  handlePageNav(currPage+1)}>&raquo;</Link>
                </li>
            </ul>
        </nav>
    );
}

export default PageNav;