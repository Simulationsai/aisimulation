# 🗄️ Database Setup - PostgreSQL

## Database URL

Your Render PostgreSQL database URL:
```
postgresql://simulationai_user:3Yef2G29571FrsJtdWEGe5vWeQQkdw2k@dpg-d5qbgtp4tr6s73dcaru0-a/simulationai
```

---

## ✅ Database Integration Complete

### Entities Created

1. **User** (`users`)
   - id, email, name, password, walletAddress
   - createdAt, updatedAt

2. **Wallet** (`wallets`)
   - id, userId, balance, staked, pending
   - depositAddress, createdAt, updatedAt

3. **Transaction** (`transactions`)
   - id, userId, type, amount, txHash, address
   - status, timestamp

4. **ApiKey** (`api_keys`)
   - id, userId, name, key, usage, limit
   - lastUsed, created

5. **Node** (`nodes`)
   - id, userId, type, name, status
   - uptime, earnings, token, createdAt, updatedAt

6. **Waitlist** (`waitlist`)
   - id, email, createdAt

---

## 🔧 Environment Variables

Set these in Render dashboard:

```
DATABASE_URL=postgresql://simulationai_user:3Yef2G29571FrsJtdWEGe5vWeQQkdw2k@dpg-d5qbgtp4tr6s73dcaru0-a/simulationai
NODE_ENV=production
PORT=3001
JWT_SECRET=<generate-secret>
FRONTEND_URL=https://your-frontend.vercel.app
```

---

## 🚀 Auto-Sync Mode

The database is configured with `synchronize: true` in development mode, which means:
- Tables are automatically created on first run
- Schema changes are automatically applied
- **⚠️ In production, set `synchronize: false` and use migrations**

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  walletAddress VARCHAR,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

### Wallets Table
```sql
CREATE TABLE wallets (
  id UUID PRIMARY KEY,
  userId UUID REFERENCES users(id),
  balance DECIMAL(18,8) DEFAULT 0,
  staked DECIMAL(18,8) DEFAULT 0,
  pending DECIMAL(18,8) DEFAULT 0,
  depositAddress VARCHAR,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

### Transactions Table
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  userId UUID REFERENCES users(id),
  type VARCHAR NOT NULL,
  amount DECIMAL(18,8) NOT NULL,
  txHash VARCHAR,
  address VARCHAR,
  status VARCHAR DEFAULT 'pending',
  timestamp TIMESTAMP
);
```

### API Keys Table
```sql
CREATE TABLE api_keys (
  id UUID PRIMARY KEY,
  userId UUID REFERENCES users(id),
  name VARCHAR NOT NULL,
  key VARCHAR UNIQUE NOT NULL,
  usage INTEGER DEFAULT 0,
  limit INTEGER DEFAULT 10000,
  lastUsed TIMESTAMP,
  created TIMESTAMP
);
```

### Nodes Table
```sql
CREATE TABLE nodes (
  id UUID PRIMARY KEY,
  userId UUID REFERENCES users(id),
  type VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'stopped',
  uptime DECIMAL(5,2) DEFAULT 0,
  earnings DECIMAL(18,8) DEFAULT 0,
  token VARCHAR,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

### Waitlist Table
```sql
CREATE TABLE waitlist (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  createdAt TIMESTAMP
);
```

---

## ✅ Features

- ✅ **TypeORM Integration** - Full ORM support
- ✅ **Password Hashing** - bcrypt for secure passwords
- ✅ **Auto Schema Sync** - Tables created automatically (dev mode)
- ✅ **Relationships** - Foreign keys and joins
- ✅ **Transactions** - Database transactions support
- ✅ **Migrations Ready** - Can generate migrations when needed

---

## 🔄 Next Steps

1. **Deploy to Render:**
   - Set `DATABASE_URL` environment variable
   - Backend will auto-create tables on first run

2. **Production Migrations:**
   - Generate migrations: `npm run migration:generate`
   - Run migrations: `npm run migration:run`

3. **Test Connection:**
   - Deploy backend
   - Check logs for database connection
   - Test API endpoints

---

**Database is ready!** All services now use PostgreSQL instead of in-memory storage.
