import './CompanyDetail.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './api';
import JobCardList from './JobCardList';
import LoadingSpinner from './LoadingSpinner';
import { useContext } from "react";
import userContext from "./userContext";
import Alert from './Alert';

/** CompanyDetail component for Jobly.
 *
 * Props: none
 *
 * State:
 * - company: singular company object associated with company handle from UR
 * - notFound
 *
 * RoutesList -> CompanyDetail -> {JobCardList, LoadingSpinner}
 */

function CompanyDetail() {
    const [company, setCompany] = useState({
        data: null,
    });
    const [notFound, setNotFound] = useState(false);

    const { handle } = useParams();

    useEffect(function fetchCompanyWhenMounted() {
        async function fetchCompany() {
            try {
                const company = await JoblyApi.getCompany(handle);
                setCompany(
                    {
                        data: company,
                    }
                );
            }
            catch (err) {
                setNotFound(true);
            }
        }
        fetchCompany();
    }, []);

    if (notFound) {
        return <Alert messages={[`No company: ${handle}`]} type="danger" />;
    }

    if (!company.data) return <LoadingSpinner />;

    return (
        <div className='CompanyDetail col-md-8 offset-md-2'>
            <h2>{company.data.name}</h2>
            <p>{company.data.description}</p>
            <JobCardList jobs={company.data.jobs} />
        </div>
    );
}

export default CompanyDetail;