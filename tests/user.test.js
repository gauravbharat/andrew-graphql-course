const isValidPassword = (password) => {
  return password.length >= 8 && !password.toLowerCase().includes('password');
};

// test('test case 1', () => {});
test('test case 2', () => {
  expect(2 + 2).toBe(4);
});

test('Should reject password shorter than 8 characters', () => {
  expect(isValidPassword('12345')).toBe(false);
});

test('Should reject password that contains word password', () => {
  expect(isValidPassword('iampassword')).toBe(false);
});

test('Should correctly validate a valid password', () => {
  expect(isValidPassword('test@123')).toBe(true);
});
