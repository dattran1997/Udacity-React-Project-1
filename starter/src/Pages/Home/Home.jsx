import { useNavigate } from "react-router-dom";
import { routePath } from "../../router";
import Book from "../../Components/Book";
import { getAll, update } from "../../BooksAPI";
import { useEffect, useState } from "react";

export const shelfTypes = {
    CURRENTLY_READING: 'currentlyReading',
    WANT_TO_READ: 'wantToRead',
    READ: 'read'
}

export default function Home() {
    const navigate = useNavigate();
    const [allBooks, setAllBooks] = useState([]);

    useEffect(() => {
        getAllBooks();
    }, [])

    const getAllBooks = async () => {
        // Fetch all books from the API
        try {
            const allBooks = await getAll();
            setAllBooks(allBooks);
        } catch (error) {
            alert('An error occurred while fetching all books. Please try again later.');
            console.error('error fetching all books..', error);
        }
    }

    const updateBookShelf = async (book, shelf) => {
        console.log('update book shelf..', book, shelf);

        try {
            const res = await update(book, shelf);
            console.log('update book shelf res..', res);
            getAllBooks();
        } catch (error) {
            alert('An error occurred while updating the book shelf. Please try again later.');
            console.error('error updating book shelf..', error);
        }
    }

    return (
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                    {allBooks.filter(book => book.shelf === shelfTypes.CURRENTLY_READING).map(book => (
                        <Book 
                            key={book.id} 
                            data={book} 
                            updateBookShelf={updateBookShelf}
                        />
                    ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                    {allBooks.filter(book => book.shelf === shelfTypes.WANT_TO_READ).map(book => (
                        <Book 
                            key={book.id} 
                            data={book} 
                            updateBookShelf={updateBookShelf}
                        />
                    ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                    {allBooks.filter(book => book.shelf === shelfTypes.READ).map(book => (
                        <Book 
                            key={book.id} 
                            data={book} 
                            updateBookShelf={updateBookShelf}
                        />
                    ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <button className="open-search-btn" onClick={() => navigate(routePath.SEARCH)}>Add a book</button>
        </div>
      </div>
    )
}