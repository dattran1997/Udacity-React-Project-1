import { useNavigate } from "react-router-dom";
import { routePath } from "../../router";
import { useCallback, useEffect, useState } from "react";
import useDebounce from "../../Hooks/useDebounce";
import { search, update } from "../../BooksAPI";
import Book from "../../Components/Book";

export default function Search() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const debounceValue = useDebounce(searchValue, 500);
    
    const searchBook = useCallback(async () => {
        try {
            const res = await search(debounceValue);
            console.log('res..', res);
            if (!res.error) {
                setBooks(res?.filter((book) => book.imageLinks));
            }

            if (res?.items) {
                setBooks(res?.items);
            }
        } catch (error) {
            alert('An error occurred while searching for books. Please try again later.');
            console.error('error searching books..', error);
        }
    }, [debounceValue]);

    useEffect(() => {
        if (!debounceValue) {
            setBooks([]);
            return;
        }

        searchBook();
    }, [searchBook, debounceValue]);

    const updateBookShelf = async (book, shelf) => {
        console.log('update book shelf..', book, shelf);

        try {
            const res = await update(book, shelf);
            console.log('update book shelf res..', res);
            navigate(routePath.HOME);
        } catch (error) {
            alert('An error occurred while updating the book shelf. Please try again later.');
            console.error('error updating book shelf..', error);
        }
    }


    return (
        <div className="search-books">
          <div className="search-books-bar">
            <button
              className="close-search"
              onClick={() => navigate(routePath.HOME)}
            >
              Close
            </button>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {books && books?.map(book => (
                    <Book 
                        key={book.id} 
                        data={book} 
                        updateBookShelf={updateBookShelf}
                        isSearch/>
                ))}
            </ol>
          </div>
        </div>
    )
}