import express from 'express';
import dotenv from 'dotenv';
import contactHandler from './contact.js';
import healthHandler from './health.js';
import signupHandler from './testers/signup.js';
import visitorHandler from './stats/visitor-count.js';

dotenv.config();

const app = express();
const port = 3005;

app.use(express.json());

// Helper to wrap Vercel handlers for Express
const wrap = (handler: any) => async (req: express.Request, res: express.Response) => {
  try {
    await handler(req, res);
  } catch (err: any) {
    console.error('API Error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Routes mapped to Vercel functions
app.all('/api/contact', wrap(contactHandler));
app.all('/api/health', wrap(healthHandler));
app.post('/api/testers/signup', wrap(signupHandler));
app.get('/api/stats/visitor-count', wrap(visitorHandler));

app.listen(port, () => {
  console.log(`\n🚀 API Server (Local Dev) running at http://localhost:${port}`);
  console.log(`   Proxied via Vite to handled serverless endpoints.\n`);
});
