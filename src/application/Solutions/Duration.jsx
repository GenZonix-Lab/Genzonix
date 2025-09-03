import React from 'react'

const Duration = ({ setDuration, setStatus }) => {
    // Generate options for every 30 minutes up to 3 days (4320 minutes)
    const options = [];
    for (let minutes = 0; minutes <= 4320; minutes += 60) {
        let label = '';
        if (minutes === 0) label = '0 minutes';
        else if (minutes < 60) label = `${minutes} minutes`;
        else if (minutes < 1440) {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            label = mins === 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : `${hours} hour${hours > 1 ? 's' : ''} ${mins} minutes`;
        } else {
            const days = Math.floor(minutes / 1440);
            const rem = minutes % 1440;
            const hours = Math.floor(rem / 60);
            label = rem === 0 ? `${days} Day${days > 1 ? 's' : ''}` : `${days} Day${days > 1 ? 's' : ''} ${hours} hour${hours > 1 ? 's' : ''}`;
        }
        options.push(
            <option key={minutes} value={minutes}>{label}</option>
        );
        if (minutes === 0) options.push(<option key={30} value={30}>{'30 minutes'}</option>);
    }

    return (
        <div className="duration mx-auto py-3">
            <label htmlFor="duration" className='form-label fs-4 mt-3'>Duration</label>
            <select
                name="duration"
                id="duration"
                className="form-control"
                onChange={(e) => { setDuration(e.target.value); setStatus(false); }}
            >
                {options}
            </select>
        </div>
    );
}

export default Duration