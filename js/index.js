import { getBooks, getBook, deleteBook, postBook, patchBook, searchBookByTitle } from "./api/books.js";

const renderCategories = (categories) => {
	// create a single HTML string made up of all the categories
	const categoriesHTML = categories.map((category) => `<span class="book-card-tag">${category}</span>`).join("");
	return categoriesHTML;
};
const renderBook = (book, target) => {
	const bookCard = document.createElement("article");
	bookCard.classList.add("book-card");
	bookCard.innerHTML = `
        <div class="book-card-title">${book.title}</div>
        <p class="book-card-year">${book.year}</p>
        <p class="book-card-description">${book.description}.</p>
        <div class="d-flex align-items-center justify-content-between">
            <span class="book-card-span">Rating</span>
            <span class="book-card-rating">${book.rating}/10</span>
        </div>
        <meter class="book-card-meter" min="0" max="10" value="${book.rating}"></meter>
        <div class="d-flex align-items-center justify-content-start gap-10 flex-wrap">
            ${renderCategories(book.categories)}
        </div>
    `;
	// IF we had buttons in here that needed event listeners, we would do it here
	const editBtn = bookCard.querySelector("button");
	editBtn?.addEventListener("click", async () => {
		/// DO THE THANG!
	});
	// THEN append it into the DOM
	target.appendChild(bookCard);
};

//////// MAIN METHOD
(async () => {
	/////
	const books = await getBooks();
	console.log(books);
	for (let book of books) {
		const target = document.querySelector(".books-grid");
		renderBook(book, target);
	}
})();
