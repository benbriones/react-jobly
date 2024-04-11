import './JobCard.css';
import { useContext } from 'react';
import userContext from './userContext';
import JoblyApi from './api';

/** JobCard component for Jobly.
 *
 * Props:
 * - job: object
 *           {id, title, salary, equity, companyHandle, companyName}
 *
 * State: none
 *
 * JobCardList -> JobCard
 */

function JobCard({ job }) {
    const { currentUser, setCurrentUser } = useContext(userContext);



    /** applies to job for currentUser */
    async function applyToJob() {
        const { username } = currentUser;

        const appliedJobId = await JoblyApi.applyToJob(job.id, username);
        currentUser.applications.add(appliedJobId);
        setCurrentUser(currentUser => ({
            ...currentUser
        }));
    }

    return (
        <div className='JobCard card'>
            <div className='JobCard-body'>
                <h5 className='JobCard-title'>
                    {job.title}
                </h5>
                <p>{job.companyName}</p>
                <p>Salary: ${job.salary}</p>
                <p>Equity: {job.equity}</p>
                {currentUser.applications.has(job.id)
                    ? <button
                        disabled
                        className='JobCard-apply
                        btn btn-danger
                        fw-bold text-uppercase float-end'>Applied</button>
                    : <button
                        className='JobCard-apply
                        btn btn-danger
                        text-uppercase float-end'
                        onClick={applyToJob}>Apply</button>}
            </div>
        </div >
    );
}

export default JobCard;