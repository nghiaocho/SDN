import React, { useEffect, useState } from "react";
import * as bookService from "../service/books.service";
import CarouselBooks from "../components/CarouselBooks";
import FilterSidebar from "../components/FilterSidebar";
import { useBookFilter } from "../hooks/useBookFilter";

const Books = () => {
  const [books, setBooks] = useState([]);
  
  const { filteredBooks, isFiltering, filterProps } = useBookFilter(books);

  const getAllBooks = async () => {
    const data = await bookService.getAllBooks();
    setBooks(data);
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sidebar */}
      <div className="col-span-2">
        <FilterSidebar {...filterProps} />
      </div>

      {/* Main Content */}
      <div className="col-span-10">
        <CarouselBooks 
          books={isFiltering ? filteredBooks : books} 
          carouselType={isFiltering ? `Search Results (${filteredBooks.length})` : "ALL BOOKS"} 
          showSeeAll={false} 
        />
      </div>
    </div>
  );
};

export default Books;
