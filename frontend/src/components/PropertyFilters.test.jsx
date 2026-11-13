import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyFilters from "./PropertyFilters";


test("renders all six input fields", () => {

    render(<PropertyFilters query={{}} setQuery={jest.fn()} setClickID={jest.fn()}/>)

    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/zipcode/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/minimum price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/maximum price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/beds/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/baths/i)).toBeInTheDocument();


})


test("if user selects 10+ beds, sets beds to 10", () => {

    const setQuery = jest.fn();
    render(<PropertyFilters query={{}} setQuery={setQuery} setClickID={jest.fn()}/>)

    fireEvent.change(screen.getByLabelText(/beds/i), {
        target: {value: "10plus" }
    })

    expect(setQuery).toHaveBeenCalledWith({
        beds: 10
    });

})


/*test("resets all filters when clear is clicked", () => {

    const setQuery = jest.fn();
    const setClickID = jest.fn();
    const query = {
        city: "San Dimas",
        zipcode: "91773",
        minPrice: "600000",
        maxPrice: "2000000",
        beds: 4,
        baths: 2
    };
    render(<PropertyFilters query={query} setQuery={setQuery} setClickID={setClickID}/>)

    fireEvent.click(screen.getByText("CLEAR"));

    expect(setQuery).toHaveBeenCalledWith({
        city: "",
        zipcode: "",
        minPrice: "",
        maxPrice: "",
        beds: "",
        baths: "",
        offset: 0
    });

    expect(setClickID).toHaveBeenCalledWith(true);

})*/
