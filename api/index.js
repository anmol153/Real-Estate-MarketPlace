import experss from 'express';

const app = experss();
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});