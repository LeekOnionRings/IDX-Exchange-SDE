function Pagination({ currentPage, totalProperties, itemsPerPage, onPageChange }) {

    const totalPages = Math.ceil(totalProperties/itemsPerPage);

    //Displays page amount based on filter results
    const generatePages = () => {
        const links = [];
        for(let i = 0; i < totalPages; i++) {
            const thisPage = i + 1;
            links.push(
                <li 
                    key={thisPage}
                    onClick={() => {
                        onPageChange(thisPage);
                    }}
                    //Clicked page (thisPage) will light up purple
                    className={`border p-3 cursor-pointer ${thisPage === currentPage ? 'bg-violet-600' : ''}`}
                >
                    {thisPage}
                </li>
            );
        } 
        return links;
    }

    const onPrevious = () => {
        if(currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const onNext = () => {
        if(currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    }

    //className={`border p-3 cursor-pointer ${thisPage === currentPage ? 'active' : null} active:bg-violet-600`}
    return(
        <div className="flex items-center justify-center">
            <ul className="flex gap-6 list-none">

                <li className="border p-3 cursor-pointer active:bg-violet-600"
                    onClick={() => {
                        onPrevious();
                    }}
                >
                    &lt;
                </li>

                {generatePages()}

                <li className="border p-3 cursor-pointer active:bg-violet-600"
                    onClick={() => {
                        onNext();
                    }}
                >
                    &gt;
                </li>

            </ul>
        </div>
    );

}

export default Pagination;