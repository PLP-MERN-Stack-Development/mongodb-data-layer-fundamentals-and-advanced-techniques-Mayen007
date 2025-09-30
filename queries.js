// queries.js
// MongoDB queries for Task 2: Basic CRUD Operations
// Use in mongosh or adapt for Node.js as needed

// 1. Find all books in a specific genre (replace 'Fiction' with desired genre)
db.books.find({ genre: 'Fiction' })

// 2. Find books published after a certain year (replace year with desired year)
db.books.find({ published_year: { $gt: 1980 } })

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


// --- Task 4: Aggregation Pipeline ---

// 1. Calculate the average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } },
  { $project: { genre: "$_id", averagePrice: 1, _id: 0 } }
])

// 2. Find the author with the most books in the collection
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
])

// 3. Group books by publication decade and count them
db.books.aggregate([
  { $addFields: { decade: { $concat: [{ $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } }, "s"] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])


// --- Task 5: Indexing ---

// 1. Create an index on the 'title' field for faster searches
db.books.createIndex({ title: 1 })

// 2. Create a compound index on 'author' and 'published_year'
db.books.createIndex({ author: 1, published_year: 1 })

// 3. Use explain() to demonstrate performance improvement
// Example: Find a book by title and show query plan
db.books.find({ title: '1984' }).explain('executionStats')
// Example: Find books by author and year and show query plan
db.books.find({ author: 'George Orwell', published_year: 1949 }).explain('executionStats')
