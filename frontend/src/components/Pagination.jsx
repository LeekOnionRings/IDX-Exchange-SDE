const getPages = (currentPage, totalPages) => {

    if(totalPages === 1) {
        return [1];
    }

    const pages = [];
    const firstPage = 1;
    const lastPage = totalPages;
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;

    //First page
    pages.push(firstPage);
        //Add allipses if a gap exists
    if(Math.abs(firstPage - previousPage) > 1) {
        pages.push("...");
    }

    //Previous page (shown only if previous page is greater than the first page)
    if(firstPage < previousPage) {
        pages.push(previousPage);
    }

    //Current page (so we don't render duplicates of current page)
    if(currentPage !== firstPage && currentPage !== lastPage) {
        pages.push(currentPage);
    }

    //Next page (show next page when it's not last page)
    if(nextPage < lastPage) {
        pages.push(nextPage);
    }

    //Check and add more ellipsis
    if(Math.abs(nextPage - lastPage) > 1) {
        pages.push("...");
    }

    //Last page
    pages.push(lastPage);

    return pages;

}


function Pagination({ currentPage, totalProperties, itemsPerPage, onPageChange }) {

    const totalPages = Math.ceil(totalProperties/itemsPerPage);

    //Displays page amount based on filter results
    const generatePages = () => {

        return getPages(currentPage, totalPages).map((element, index) => {
            return(
                <li key={element + index} 
                    className={`border p-3 cursor-pointer ${element === currentPage ? 'bg-violet-600' : ''}`}
                    onClick={() => {
                        if(!isNaN(element)) {
                            onPageChange(element);
                        }
                    }}
                >
                    {element}
                </li>
            )
            
        })

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