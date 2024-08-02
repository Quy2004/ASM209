import express from 'express';
import cors from 'cors'; // Import cors
import path from 'path'; // Import path
import { fileURLToPath } from 'url'; // Import fileURLToPath
import connectdb from './database/connect.js';
import router from './router/product.js';
import routerCategory from './router/categorys.js';
import authRouter from './router/auth.js';
import routerUser from './router/user.js';

// Đoạn mã để lấy __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4200;

// Cấu hình CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

// Cấu hình để phục vụ các tệp tin tĩnh từ thư mục uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Cấu hình các middleware
app.use(express.json());
app.use('/api', router);
app.use('/api', routerCategory);
app.use('/api', authRouter);
app.use('/api', routerUser);

// Khởi động server
app.listen(port, async () => {
  await connectdb();
  console.log(`Endpoint http://localhost:${port}/api/`);
});
