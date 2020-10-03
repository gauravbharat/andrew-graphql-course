//demo data
const users = [
  {
    id: 'IN007',
    name: 'Gary',
    email: 'garyd@007.in',
    age: 40,
  },
  {
    id: 'IN008',
    name: 'Andrew',
    email: 'andrew@007.in',
    age: 29,
  },
  {
    id: 'IN009',
    name: 'Colt',
    email: 'colt@007.in',
    age: 35,
  },
  {
    id: 'IN010',
    name: 'Max',
    email: 'max@007.in',
    age: 40,
  },
];

const posts = [
  {
    id: 'XYZ0001',
    title: 'Awesome camps!',
    body: 'Angular Yelpcamps are really awesome!!!',
    published: true,
    author: 'IN010',
  },
  {
    id: 'XYZ0002',
    title: 'Chinese incursions!',
    body:
      'Indian Army is well prepared to give a befitting response to chinki transgressions!!!',
    published: true,
    author: 'IN007',
  },
  {
    id: 'XYZ0003',
    title: 'Kangana MAYHEM!',
    body: 'BMC acted on political instructions!',
    published: false,
    author: 'IN007',
  },
  {
    id: 'XYZ0004',
    title: 'Rhea Rhea Rhea!',
    body: 'Stop reporting news about drug addicts please!!!',
    published: true,
    author: 'IN007',
  },
];

const comments = [
  {
    id: '1',
    text: 'Nice post!!',
    author: 'IN007',
    post: 'XYZ0001',
  },
  {
    id: '2',
    text: 'Awesome post!',
    author: 'IN008',
    post: 'XYZ0002',
  },
  {
    id: '3',
    text: 'So true!',
    author: 'IN009',
    post: 'XYZ0002',
  },
  {
    id: '4',
    text: 'Second that!!!',
    author: 'IN010',
    post: 'XYZ0002',
  },
  {
    id: '5',
    text: 'Awesome camps!',
    author: 'IN008',
    post: 'XYZ0001',
  },
  {
    id: '6',
    text: 'Beautiful!',
    author: 'IN009',
    post: 'XYZ0001',
  },
];

const populateAuthor = (parent, args, { db: { users } }, info) => {
  return users.find((user) => {
    return user.id === parent.author;
  });
};

const emailExists = (email) => {
  const emailTaken = users.some((user) => user.email === email);
  if (emailTaken) {
    throw new Error('Email taken.');
  }

  return;
};

exports.db = {
  users,
  posts,
  comments,
  populateAuthor,
  emailExists,
};

// export { db as default };
