import './CompaniesList.css';
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import SearchForm from './SearchForm';
import CompanyCardList from "./CompanyCardList";
import LoadingSpinner from './LoadingSpinner';
import PageNav from './PageNav';

/** CompaniesList component for Jobly.
 *
 * Props: none
 *
 * State:
 * - companies: array of company objects
 *
 * RoutesList -> CompaniesList -> {CompanyCardList, LoadingSpinner, SearchForm}
 */

function CompaniesList() {
    const [companies, setCompanies] = useState({
        data: null,
        searched: "",
    });

    const companiesPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(function fetchCompaniesWhenMounted() {
        search(companies.searched);
    }, []);

    /** handles search for companies that match search term */
    async function search(searchTerm) {
        const params = searchTerm === ""
            ? {}
            : { nameLike: searchTerm };

        const companies = await JoblyApi.getCompanies(params);
        setCompanies({
            data: companies,
            searched: searchTerm,
        });
    }

    /** goes to page clicked on */
    function handlePageNav(page) {
        setCurrentPage(page);
    }


    if (!companies.data) return <LoadingSpinner />;

    const lastIdx = currentPage * companiesPerPage;
    const firstIdx = lastIdx - (companiesPerPage-1);
    const currCompanies = companies.data.slice(firstIdx, lastIdx);


    return (
        <div className='CompaniesList col-md-8 offset-md-2'>
            <SearchForm handleSearch={search} />
            {companies.searched
                ? <h1>{`Search Results for '${companies.searched}'`}</h1>
                : <h1>All Companies</h1>}
            <CompanyCardList companies={currCompanies} />
            <PageNav
                totalItems={companies.data.length}
                handlePageNav={handlePageNav}
                currPage={currentPage}
                itemsPerPage={companiesPerPage} />
        </div>
    );
}

export default CompaniesList;