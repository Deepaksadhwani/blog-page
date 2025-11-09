import prisma from '../src/libs/prisma.js';

const sampleBlogs = [
  {
    title: 'Getting Started with Node.js',
    body: `Node.js has revolutionized JavaScript development by allowing developers to run JavaScript on the server side. In this comprehensive guide, we'll explore the fundamentals of Node.js and how to build scalable applications.

## What is Node.js?

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

## Key Features

- **Asynchronous and Event-Driven**: All APIs of Node.js are asynchronous, meaning non-blocking.
- **Fast Execution**: Built on Google Chrome's V8 engine, Node.js compiles JavaScript to native machine code.
- **Single Threaded**: Uses a single-threaded model with event looping.
- **Cross-Platform**: Works on various platforms like Windows, Linux, Unix, Mac OS X, etc.

## Getting Started

To install Node.js, visit the official website and download the installer for your operating system. Once installed, you can verify the installation by running:

\`\`\`bash
node --version
npm --version
\`\`\`

## Your First Node.js Application

Create a file called \`app.js\` and add the following code:

\`\`\`javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
\`\`\`

Run your application with \`node app.js\` and visit http://localhost:3000 in your browser.

## Conclusion

Node.js is a powerful platform for building fast and scalable network applications. This is just the beginning of your journey with Node.js!`,
    date: new Date('2025-11-01'),
  },
  {
    title: 'Understanding React Hooks',
    body: `React Hooks have transformed the way we write React components. Let's dive deep into the most commonly used hooks and understand how they work.

## Introduction to Hooks

Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8.

## useState Hook

The most basic hook is \`useState\`. It allows you to add state to functional components:

\`\`\`javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook

\`useEffect\` lets you perform side effects in function components. It's similar to componentDidMount, componentDidUpdate, and componentWillUnmount combined.

\`\`\`javascript
import { useEffect, useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  }, [count]);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Click me
    </button>
  );
}
\`\`\`

## Custom Hooks

You can create your own hooks to reuse stateful logic between components:

\`\`\`javascript
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return width;
}
\`\`\`

## Best Practices

1. Only call hooks at the top level
2. Only call hooks from React functions
3. Use the ESLint plugin to enforce these rules
4. Give custom hooks descriptive names starting with "use"

## Conclusion

React Hooks provide a more direct API to the React concepts you already know. They make your code more readable and easier to maintain.`,
    date: new Date('2025-11-03'),
  },
  {
    title: 'PostgreSQL Best Practices',
    body: `PostgreSQL is one of the most powerful and feature-rich relational databases. Here are some best practices to help you get the most out of it.

## Database Design

### Normalize Your Data

Proper normalization reduces data redundancy and improves data integrity. Follow these normal forms:

1. **First Normal Form (1NF)**: Eliminate repeating groups
2. **Second Normal Form (2NF)**: Remove partial dependencies
3. **Third Normal Form (3NF)**: Remove transitive dependencies

### Use Appropriate Data Types

Choose the right data type for each column:

- Use \`SERIAL\` or \`UUID\` for primary keys
- Use \`TIMESTAMP WITH TIME ZONE\` for dates
- Use \`NUMERIC\` for financial data
- Use \`TEXT\` instead of \`VARCHAR\` without length limit

## Indexing Strategies

### When to Index

- Columns used in WHERE clauses
- Columns used in JOIN conditions
- Columns used in ORDER BY
- Foreign key columns

### Types of Indexes

\`\`\`sql
-- B-tree index (default)
CREATE INDEX idx_users_email ON users(email);

-- Unique index
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- Partial index
CREATE INDEX idx_active_users ON users(email) WHERE active = true;

-- Multi-column index
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);
\`\`\`

## Query Optimization

### Use EXPLAIN ANALYZE

Always analyze your queries:

\`\`\`sql
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'user@example.com';
\`\`\`

### Avoid SELECT *

Only select the columns you need:

\`\`\`sql
-- Bad
SELECT * FROM users;

-- Good
SELECT id, name, email FROM users;
\`\`\`

## Connection Pooling

Use connection pooling to manage database connections efficiently. Libraries like \`pg-pool\` or Prisma handle this automatically.

## Backup and Recovery

### Regular Backups

\`\`\`bash
# Full backup
pg_dump database_name > backup.sql

# Compressed backup
pg_dump database_name | gzip > backup.sql.gz
\`\`\`

### Point-in-Time Recovery

Enable WAL archiving for point-in-time recovery capabilities.

## Security

1. Use strong passwords
2. Limit database user permissions
3. Use SSL connections
4. Keep PostgreSQL updated
5. Use parameterized queries to prevent SQL injection

## Monitoring

Monitor these key metrics:

- Connection count
- Query performance
- Cache hit ratio
- Disk usage
- Replication lag (if using replication)

## Conclusion

Following these best practices will help you build robust, scalable, and maintainable PostgreSQL databases. Remember to always test in a development environment first!`,
    date: new Date('2025-11-05'),
  },
];

const sampleComments = [
  {
    author: 'Alice Johnson',
    comment: 'Great introduction! This really helped me understand the basics of Node.js.',
  },
  {
    author: 'Bob Smith',
    comment: 'Could you do a follow-up article on Express.js?',
  },
  {
    author: 'Carol White',
    comment: 'Very clear explanation of React Hooks. The examples are excellent!',
  },
  {
    author: 'David Brown',
    comment: 'I struggled with useEffect before, but this article made it click for me.',
  },
  {
    author: 'Eve Davis',
    comment: 'These PostgreSQL tips are gold! Especially the indexing strategies.',
  },
];

const sampleRatings = [
  {
    author: 'Alice Johnson',
    rating: 5,
    review: 'Excellent article for beginners. Very well structured and easy to follow.',
  },
  {
    author: 'Frank Miller',
    rating: 4,
    review: 'Good content, but could use more advanced examples.',
  },
  {
    author: 'Grace Lee',
    rating: 5,
    review: 'Perfect explanation! This is exactly what I was looking for.',
  },
  {
    author: 'Henry Wilson',
    rating: 4,
    review: 'Very informative. Would love to see more performance optimization tips.',
  },
];

async function seed() {
  try {
    console.log('🌱 Starting database seed...');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await prisma.rating.deleteMany({});
    await prisma.comment.deleteMany({});
    await prisma.blog.deleteMany({});

    // Create blogs with comments and ratings
    console.log('📝 Creating blogs...');
    
    for (let i = 0; i < sampleBlogs.length; i++) {
      const blogData = sampleBlogs[i];
      
      // Create slug
      const slug = blogData.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const blog = await prisma.blog.create({
        data: {
          title: blogData.title,
          body: blogData.body,
          slug: slug,
          date: blogData.date,
        },
      });

      console.log(`  ✅ Created blog: ${blog.title}`);

      // Add 2-3 comments per blog
      const commentCount = Math.floor(Math.random() * 2) + 2;
      for (let j = 0; j < commentCount; j++) {
        const commentData = sampleComments[Math.floor(Math.random() * sampleComments.length)];
        await prisma.comment.create({
          data: {
            author: commentData.author,
            comment: commentData.comment,
            blogId: blog.id,
          },
        });
      }
      console.log(`  Added ${commentCount} comments`);

      // Add 2-3 ratings per blog
      const ratingCount = Math.floor(Math.random() * 2) + 2;
      for (let j = 0; j < ratingCount; j++) {
        const ratingData = sampleRatings[Math.floor(Math.random() * sampleRatings.length)];
        await prisma.rating.create({
          data: {
            author: ratingData.author,
            rating: ratingData.rating,
            review: ratingData.review,
            blogId: blog.id,
          },
        });
      }
      console.log(`   Added ${ratingCount} ratings\n`);
    }

    console.log(' Database seeded successfully!');
    console.log(` Created:`);
    console.log(`   - ${sampleBlogs.length} blogs`);
    console.log(`   - ${await prisma.comment.count()} comments`);
    console.log(`   - ${await prisma.rating.count()} ratings`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
