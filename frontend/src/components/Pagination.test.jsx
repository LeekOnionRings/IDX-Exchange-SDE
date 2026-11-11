import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

const makeProps = ({ currentPage, totalProperties, itemsPerPage, onPageChange }) => ({
    currentPage,
    totalProperties,
    itemsPerPage,
    onPageChange,
});


test("first page", () => {

    const totalProperties = 100;
    const itemsPerPage = 10;
    const onPageChange = jest.fn();

    render(
        <Pagination
            {...makeProps({
                currentPage: 1,
                totalProperties,
                itemsPerPage,
                onPageChange,
            })}
        />
    )

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();

    //Previous arrow will be disabled
    fireEvent.click(screen.getByText("<"));
    expect(onPageChange).not.toHaveBeenCalled();

    //Next arrow goes to page 2
    fireEvent.click(screen.getByText(">"));
    expect(onPageChange).toHaveBeenCalledWith(2);

});


test("last page", () => {

    const totalProperties = 100;
    const itemsPerPage = 10;
    const onPageChange = jest.fn();

    render(
        <Pagination
            {...makeProps({
                currentPage: 10,
                totalProperties,
                itemsPerPage,
                onPageChange,
            })}
        />
    )

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();

    //Next arrow will be disabled
    fireEvent.click(screen.getByText(">"));
    expect(onPageChange).not.toHaveBeenCalled();

    //Previous arrow goes to page 9
    fireEvent.click(screen.getByText("<"));
    expect(onPageChange).toHaveBeenCalledWith(9);

});
