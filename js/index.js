import { getBooks, getBook, deleteBook, postBook, patchBook, searchBookByTitle } from "./api/books.js";

const renderModal = (book, action) => {
	const modal = document.createElement("div");
	modal.classList.add("modal");
	modal.innerHTML = `
        <div class="modal-bg"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">${book?.title ? book.title : ""}</h2>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
                <form class="modal-form" id="book-form">
                    <label for="title">
                        <span>Title</span>
                        <input required type="text" name="title" id="title" value="${book?.title ? book.title : ""}" />
                    </label>
                    <label for="year">
                        <span>Year</span>
                        <input required type="number" name="year" id="year" value="${book?.year ? book.year : ""}" />
                    </label>
                    <label for="description">
                        <span>Description</span>
                        <textarea required name="description" id="description">${book?.description ? book.description : ""}</textarea>
                    </label>
                    <label for="rating">
                        <span>Rating</span>
                        <input required type="number" name="rating" id="rating" value="${book?.rating ? book.rating : ""}" />
                    </label>
                    <label for="categories">
                        <span>Categories</span>
                        <input required type="text" name="categories" id="categories" value="${book?.categories ? book.categories.join(", ") : ""}" />
                    </label>
                    <div class="modal-form-actions">
                        <button type="submit" class="btn btn-cta" data-action="${action}">${action}</button>
                        <button type="button" class="btn btn-secondary" data-action="cancel">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `;
	// grab nodes from the modal for event listeners
	const modalClose = modal.querySelector(".modal-close");
	const modalBg = modal.querySelector(".modal-bg");
	const modalForm = modal.querySelector("#book-form");
	const modalFormCancel = modal.querySelector("[data-action='cancel']");
	const modalFormSave = modal.querySelector("[data-action='save']");
	const modalFormCreate = modal.querySelector("[data-action='create']");
	// add event listener to the close btn
	modalClose?.addEventListener("click", () => {
		modal.remove();
	});
	modalBg?.addEventListener("click", () => {
		modal.remove();
	});
	// add event listener to the cancel btn
	modalFormCancel?.addEventListener("click", (e) => {
		e.preventDefault();
		modal.remove();
	});
	// add event listener to the save btn
	modalFormSave?.addEventListener("click", async (e) => {
		e.preventDefault();
		// TODO: if the form is valid, grab the form data and create a new book object
		// REMEMBER, you still have access to the book object here because it was passed as a parameter
		// REMEMBER, the categories are a string of comma separated values, so you'll need to split them into an array
		alert(`Save button clicked for ${book.title}`);
		modal.remove();
	});
	// add event listener to the create btn
	modalFormCreate?.addEventListener("click", async (e) => {
		e.preventDefault();
		// validate the form data with the native javascript form validation
		// TODO: if the form is valid, grab the form data and create a new book object
		// REMEMBER, you still have access to the book object here because it was passed as a parameter
		// REMEMBER, the categories are a string of comma separated values, so you'll need to split them into an array
		alert(`Save button clicked for ${book.title}`);
		modal.remove();
	});
	// THEN append it into the DOM
	document.body.appendChild(modal);
};
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
		renderModal(book, "save");
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
	///// GET DOM ELEMENTS
	const addBookBtn = document.querySelector("#add-book");
	//// EVENT LISTENERS
	addBookBtn.addEventListener("click", () => {
		renderModal({}, "create");
	});
	/////
	const books = await getBooks();
	console.log(books);
	for (let book of books) {
		const target = document.querySelector(".books-grid");
		renderBook(book, target);
	}
})();
