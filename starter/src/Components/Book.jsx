import { shelfTypes } from "../Pages/Home/Home";

const defaultProps = {
    data: {
        title: '',
        authors: [],
        imageLinks: {
            thumbnail: ''
        },
    },
    updateBookShelf: () => {},
    isSearch: false,
}

export default function Book(props = defaultProps) {
    const data = props?.data;
    const isSearch = props?.isSearch;

    return (
        <li>
            <div className="book">
                <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage:`url("${data?.imageLinks?.thumbnail}")`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select onChange={(e) => props?.updateBookShelf(data, e.target.value)}>
                        {!isSearch ? (<>
                            <option value="none" disabled>
                                Move to...
                            </option>
                            <option 
                                value={shelfTypes.CURRENTLY_READING}
                                selected={data?.shelf === shelfTypes.CURRENTLY_READING}
                            >Currently Reading</option>
                            <option 
                                value={shelfTypes.WANT_TO_READ}
                                selected={data?.shelf === shelfTypes.WANT_TO_READ}
                            >Want to Read</option>
                            <option 
                                value={shelfTypes.READ}
                                selected={data?.shelf === shelfTypes.READ}
                            >Read</option>
                            <option 
                                value="none"
                            >None</option>
                        </>) : (<>
                            <option value="none" disabled selected>
                                Move to...
                            </option>
                            <option value={shelfTypes.CURRENTLY_READING}>Currently Reading</option>
                            <option value={shelfTypes.WANT_TO_READ}>Want to Read</option>
                            <option value={shelfTypes.READ}>Read</option>
                        </>)} 
                    </select>
                </div>
                </div>
                <div className="book-title">{data?.title}</div>
                <div className="book-authors">{data?.author}</div>
            </div>
        </li>
    );
}