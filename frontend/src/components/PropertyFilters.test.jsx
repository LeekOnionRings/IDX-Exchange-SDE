import { jest, render, screen, expect, test} from '@jest/globals'
import PropertyFilters from "./PropertyFilters";

test("renders all six input fields", () => {

    render(<PropertyFilters query={jest.fn()} setQuery={jest.fn()} setClickID={jest.fn()}/>)

    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/zipcode/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/min price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/max price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/beds/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/baths/i)).toBeInTheDocument();


})