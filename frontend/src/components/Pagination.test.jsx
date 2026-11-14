import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Pagination from './Pagination';

const makeProps = ({ currentPage, totalPages, onPageChange, setIsPaginationHidden }) => ({
    currentPage,
    totalPages,
    onPageChange,
    setIsPaginationHidden
});

const scrollToSpy = jest.fn();
global.scrollTo = scrollToSpy;


test("First page", () => {

    const onPageChange = jest.fn();
    const setIsPaginationHidden = jest.fn();

    render(
        <Pagination
            {...makeProps({
                currentPage: 1,
                totalPages: 10,
                onPageChange,
                setIsPaginationHidden
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
    expect(scrollToSpy).toHaveBeenCalled();
    expect(onPageChange).toHaveBeenCalledWith(2);

});


test("Last page", () => {

    const onPageChange = jest.fn();
    const setIsPaginationHidden = jest.fn();

    render(
        <Pagination
            {...makeProps({
                currentPage: 10,
                totalPages: 10,
                onPageChange,
                setIsPaginationHidden
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
    expect(scrollToSpy).toHaveBeenCalled();
    expect(onPageChange).toHaveBeenCalledWith(9);

});


test("Middle page", () => {

    const onPageChange = jest.fn();
    const setIsPaginationHidden = jest.fn();

    render(
        <Pagination
            {...makeProps({
                currentPage: 5,
                totalPages: 24,
                onPageChange,
                setIsPaginationHidden
            })}
        />
    )

    expect(screen.getByText("1")).toBeInTheDocument();
    waitFor(() => (expect.getByText("...")).toBeInTheDocument());
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    waitFor(() => (expect.getByText("...")).toBeInTheDocument());
    expect(screen.getByText("24")).toBeInTheDocument();

    //Previous arrow goes to page 4
    fireEvent.click(screen.getByText("<"));
    expect(scrollToSpy).toHaveBeenCalled();
    expect(onPageChange).toHaveBeenCalledWith(4);

    //Next arrow goes to page 6
    fireEvent.click(screen.getByText(">"));
    global.scrollTo = jest.fn();
    expect(onPageChange).toHaveBeenCalledWith(6);

})


test("Clicking a page number", () => {

    const onPageChange = jest.fn();
    const setIsPaginationHidden = jest.fn();

    render(
        <Pagination
            {...makeProps({
                currentPage: 1,
                totalPages: 20,
                onPageChange,
                setIsPaginationHidden
            })}
        />
    )

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();

    //Go to page 2 after clicking on page 2 
    fireEvent.click(screen.getByText("2"));
    expect(scrollToSpy).toHaveBeenCalled();
    expect(onPageChange).toHaveBeenCalledWith(2);

})


test("Ellipsis rendering", () => {

    const onPageChange = jest.fn();
    const setIsPaginationHidden = jest.fn();

    render(
        <Pagination
            {...makeProps({
                currentPage: 15,
                totalPages: 30,
                onPageChange,
                setIsPaginationHidden
            })}
        />
    )

    expect(screen.getByText("1")).toBeInTheDocument();
    waitFor(() => (expect.getByText("...")).toBeInTheDocument());
    expect(screen.getByText("14")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("16")).toBeInTheDocument();
    waitFor(() => (expect.getByText("...")).toBeInTheDocument());
    expect(screen.getByText("30")).toBeInTheDocument();


})


