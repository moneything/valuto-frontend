# Seed Scripts

This folder contains the database seed scripts for Valuto learning content.

## What `seedAllLearningModules.js` does

File:
- [`backend/src/seeds/seedAllLearningModules.js`](/Users/efeon/valuto-frontend/backend/src/seeds/seedAllLearningModules.js)

Purpose:
- Connects to MongoDB using `MONGODB_URI` from [`backend/.env`](/Users/efeon/valuto-frontend/backend/.env)
- Loads all category-specific learning-module seed files from [`backend/src/seeds/learning`](/Users/efeon/valuto-frontend/backend/src/seeds/learning)
- Runs them in sequence
- Closes the database connection when finished

The category seeders it runs are:
- `coreMoneySkillsSeed.js`
- `earningIncomeSeed.js`
- `borrowingDebtSeed.js`
- `entrepreneurshipSeed.js`
- `futurePlanningSeed.js`
- `investingAssetsSeed.js`
- `moneySocietySeed.js`
- `propertyPurchasesSeed.js`
- `spendingWiselySeed.js`

## How it works

Flow:
1. `dotenv` loads environment variables from `backend/.env`
2. `mongoose.connect(process.env.MONGODB_URI)` opens the database connection
3. Each category seed function is imported and executed one after another
4. Each category script inserts or updates its learning modules
5. The script logs progress to the terminal
6. The DB connection is closed in `finally`

This means `seedAllLearningModules.js` is the main entrypoint for seeding all learning modules at once.

## How to run it

From the repo root:

```bash
cd /Users/efeon/valuto-frontend/backend
node src/seeds/seedAllLearningModules.js
```

## Prerequisites

Before running:
- MongoDB must be running
- `backend/.env` must contain a valid `MONGODB_URI`
- backend dependencies must already be installed

Current local example from [`backend/.env`](/Users/efeon/valuto-frontend/backend/.env):

```env
MONGODB_URI=mongodb://localhost:27017/valuto-dev
```

## Recommended order

If you are setting up the learning content from scratch, run:

```bash
cd /Users/efeon/valuto-frontend/backend
node src/seeds/seedCategories.js
node src/seeds/seedAllLearningModules.js
```

Reason:
- `seedCategories.js` creates the category records first
- `seedAllLearningModules.js` then seeds the modules that belong to those categories

## Related scripts

Category seeding:
- [`backend/src/seeds/seedCategories.js`](/Users/efeon/valuto-frontend/backend/src/seeds/seedCategories.js)

Test users:
- [`backend/src/seeds/seedTestUsers.js`](/Users/efeon/valuto-frontend/backend/src/seeds/seedTestUsers.js)

Learning category seed files:
- [`backend/src/seeds/learning/coreMoneySkillsSeed.js`](/Users/efeon/valuto-frontend/backend/src/seeds/learning/coreMoneySkillsSeed.js)
- [`backend/src/seeds/learning/earningIncomeSeed.js`](/Users/efeon/valuto-frontend/backend/src/seeds/learning/earningIncomeSeed.js)
- [`backend/src/seeds/learning/borrowingDebtSeed.js`](/Users/efeon/valuto-frontend/backend/src/seeds/learning/borrowingDebtSeed.js)
- [`backend/src/seeds/learning/entrepreneurshipSeed.js`](/Users/efeon/valuto-frontend/backend/src/seeds/learning/entrepreneurshipSeed.js)
- [`backend/src/seeds/learning/futurePlanningSeed.js`](/Users/efeon/valuto-frontend/backend/src/seeds/learning/futurePlanningSeed.js)
- [`backend/src/seeds/learning/investingAssetsSeed.js`](/Users/efeon/valuto-frontend/backend/src/seeds/learning/investingAssetsSeed.js)
- [`backend/src/seeds/learning/moneySocietySeed.js`](/Users/efeon/valuto-frontend/backend/src/seeds/learning/moneySocietySeed.js)
- [`backend/src/seeds/learning/propertyPurchasesSeed.js`](/Users/efeon/valuto-frontend/backend/src/seeds/learning/propertyPurchasesSeed.js)
- [`backend/src/seeds/learning/spendingWiselySeed.js`](/Users/efeon/valuto-frontend/backend/src/seeds/learning/spendingWiselySeed.js)

## Notes

- [`backend/src/seeds/runAllSeeds.js`](/Users/efeon/valuto-frontend/backend/src/seeds/runAllSeeds.js) is currently empty, so it is not the script to use.
- If you rerun a seeder, behavior depends on how each individual category seed file was written. Some are idempotent, some may insert fresh records if they do not check for existing ones first.
