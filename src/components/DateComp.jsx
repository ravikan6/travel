import { Popover } from "./popover"

export const DateComp = ({ type, departDate, returnDate, onDepartDateChange, onReturnDateChange }) => {
    return (
        <>
            <Popover
                trigger={
                    <div className="trigger-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                        <div className="content">
                            <span className="value">
                                {type === 'return' 
                                    ? (departDate && returnDate 
                                        ? `${departDate} - ${returnDate}`
                                        : 'Select dates')
                                    : (departDate || 'Select date')}
                            </span>
                        </div>
                    </div>
                }
                content={
                    <div style={{ padding: '8px' }}>
                        <div>
                            <label>Departure Date</label>
                            <input 
                                type="date" 
                                value={departDate}
                                onChange={(e) => onDepartDateChange(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                        {type === 'return' && (
                            <div style={{ marginTop: '8px' }}>
                                <label>Return Date</label>
                                <input 
                                    type="date" 
                                    value={returnDate}
                                    onChange={(e) => onReturnDateChange(e.target.value)}
                                    min={departDate || new Date().toISOString().split('T')[0]}
                                />
                            </div>
                        )}
                    </div>
                }
            />
        </>
    )
} 