import './JobsList.css';
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import SearchForm from './SearchForm';
import JobCardList from "./JobCardList";
import LoadingSpinner from './LoadingSpinner';
import PageNav from "./PageNav"


/** JobsList component for Jobly.
 *
 * Props: none
 *
 * State:
 * - jobs: array of job objects
 *  [ { id, title, salary, equity, companyHandle, companyName }, ...]
 *
 * RoutesList -> JobsList -> {JobCardList, LoadingSpinner, SearchForm}
 */

function JobsList() {
    const [jobs, setJobs] = useState({
        data: null,
        searched: "",
    });

    const jobsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(function fetchJobsWhenMounted() {
        search(jobs.searched);
    }, []);

    /** handles search for jobs that match search term */
    async function search(searchTerm) {
        const params = searchTerm === ""
            ? {}
            : { title: searchTerm };

        const jobs = await JoblyApi.getJobs(params);
        setJobs({
            data: jobs,
            searched: searchTerm,
        });
    }

    /** goes to page clicked on */
    function handlePageNav(page) {
        setCurrentPage(page);
    }



    if (!jobs.data) return <LoadingSpinner />;

    const lastIdx = currentPage * jobsPerPage;
    const firstIdx = lastIdx - jobsPerPage;
    const currJobs = jobs.data.slice(firstIdx, lastIdx);

    return (
        <div className='JobsList col-md-8 offset-md-2'>
            <SearchForm handleSearch={search} />
            {jobs.searched
                ? <h1>{`Search Results for '${jobs.searched}'`}</h1>
                : <h1>All Jobs</h1>}
            <JobCardList jobs={currJobs} />
            <PageNav
                totalItems={jobs.data.length}
                handlePageNav={handlePageNav}
                currPage={currentPage}
                itemsPerPage={jobsPerPage} />
        </div>
    );
}

export default JobsList;