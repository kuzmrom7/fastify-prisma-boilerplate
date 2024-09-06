// import jwt from 'jsonwebtoken';

// const accessTokenSecret = 'your-access-secret';
// const refreshTokenSecret = 'your-refresh-secret';

// // Генерация нового accessToken
// export function generateAccessToken(user: { id: number; email: string }) {
//   return jwt.sign({ id: user.id, email: user.email }, accessTokenSecret, { expiresIn: '15m' });
// }

// // Верификация refreshToken
// export function verifyRefreshToken(token: string) {
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, refreshTokenSecret, (err, decoded) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(decoded); // Возвращаем данные пользователя
//     });
//   });
// }
