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
        <div class="book-card-actions">
            <div class="book-card-actions-toggle">
                <svg width="15" height="15" viewBox="0 0 1200 1200">
                    <g fill="currentColor">
                        <path d="m700 200c0-55.227-44.77-100-100-100s-100 44.773-100 100 44.77 100 100 100 100-44.773 100-100z"/>
                        <path d="m600 500c55.23 0 100 44.77 100 100s-44.77 100-100 100-100-44.77-100-100 44.77-100 100-100z"/>
                        <path d="m600 900c55.23 0 100 44.77 100 100s-44.77 100-100 100-100-44.77-100-100 44.77-100 100-100z"/>
                    </g>
                </svg>  
            </div>
            <div class="book-card-actions-menu">
                <div class="book-card-action" data-action="edit">Edit</div>
                <div class="book-card-action" data-action="delete">Delete</div>
            </div>
        </div>
    `;
	// grab nodes from the card for event listeners
	const actionsParent = bookCard.querySelector(".book-card-actions");
	const actionsToggle = bookCard.querySelector(".book-card-actions-toggle");
	const editBtn = bookCard.querySelector(".book-card-action[data-action='edit']");
	const deleteBtn = bookCard.querySelector(".book-card-action[data-action='delete']");
	// named event handler to close the menu if any click happens outside of it
	const handleMenuClose = (e) => {
		// adding optional chaining to the parameter to avoid errors
		if (!actionsParent.contains(e?.target)) {
			actionsParent.classList.remove("active");
			document.removeEventListener("click", handleMenuClose);
		}
	};
	// add event listener to the toggle
	actionsToggle.addEventListener("click", () => {
		actionsParent.classList.toggle("active");
		// add event listener to the document to close the menu if any click happens outside of it
		document.addEventListener("click", handleMenuClose);
	});
	// add event listener to the edit btn
	editBtn.addEventListener("click", async () => {
		// TODO: add edit functionality
		// REMEMBER, you still have access to the book object here
		handleMenuClose();
		alert(`Edit button clicked for ${book.title}`);
	});
	// add event listener to the delete btn
	deleteBtn.addEventListener("click", async () => {
		// TODO: add delete functionality
		// REMEMBER, you still have access to the book object here
		handleMenuClose();
		alert(`Delete button clicked for ${book.title}`);
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
