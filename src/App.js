import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import BooksList from "./components/BooksList";
import EditBook from "./components/EditBook";
import AddBook from "./components/AddBook";
import AuthorsList from "./components/AuthorsList";
import AddAuthor from "./components/AddAuthor";
import EditAuthor from "./components/EditAuthor";
import NotFoundPage from "./components/NotFoundPage";

// This the Main App Component

function App() {
  return (
    <div className="App">
      {/* Navigation Bar */}
      <NavBar />
      {/* All Required Routes path are assigned */}
      {/* This container is used to display the diff. types of pages loading using router */}
      {/* All components all called when the link is clicked in the NavBar Component */}
      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/book-edit/:id" element={<EditBook />} />
        <Route path="/author-edit/:id" element={<EditAuthor />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/authors-list" element={<AuthorsList />} />
        <Route path="/add-author" element={<AddAuthor />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
