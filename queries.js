// queries.js
// MongoDB queries for Task 2: Basic CRUD Operations
// Use in mongosh or adapt for Node.js as needed

// 1. Find all books in a specific genre (replace 'Fiction' with desired genre)
db.books.find({ genre: 'Fiction' })

// 2. Find books published after a certain year (replace 2000 with desired year)
db.books.find({ published_year: { $gt: 2000 } })

// 3. Find books by a specific author (replace 'George Orwell' with desired author)
db.books.find({ author: 'George Orwell' })

// 4. Update the price of a specific book (replace '1984' and 15.99 as needed)
db.books.updateOne({ title: '1984' }, { $set: { price: 15.99 } })

// 5. Delete a book by its title (replace 'Moby Dick' with desired title)
db.books.deleteOne({ title: 'Moby Dick' })


// --- Task 3: Advanced Queries ---

// 1. Find books that are both in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// 2. Use projection to return only the title, author, and price fields
// Example: Find all books, but only show title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// 3. Sorting by price ascending
db.books.find().sort({ price: 1 })
//    Sorting by price descending
db.books.find().sort({ price: -1 })

// 4. Pagination: limit and skip (5 books per page)
//    Page 1 (first 5 books)
db.books.find().limit(5)
//    Page 2 (next 5 books)
db.books.find().skip(5).limit(5)
