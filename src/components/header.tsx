

export const Header = () => {

    return (
        <header>
            <a className="nav" href="/" >
                Stays
            </a>
            <a className="nav" href="/" data-state="active">
                Flights
            </a>
            <a className="nav" href="/">
                Cars
            </a>
            <a className="nav" href="/">
                Packages
            </a>
        </header>
    )
}