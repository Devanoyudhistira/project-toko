import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

const data =  [{
    number: 83845923336,
    massage: `perbaikan telah selesai segera di ambil`,
    kasus: "perbaikan laptop",
    status: "done"
  }, {
    number: 89650120007,
    massage: `ada masalah segera datang ke toko`,
    kasus: "perbaikan printer",
    status: "problem"
  },]
app.use(
  cors({
    origin: '*', // Allow all origins; adjust as needed for security
  })
);

app.get('/', (req, res) => {
  res.json({
    uid: 12345,
    username: 'devano yudhistira',
    absen: '',
    data:data
  });
});

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));

export default app; // Export for potential reuse
