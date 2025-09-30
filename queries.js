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
