
# Rethink Assignment - URL Shortener

Implementation of basic URL shortener.

# Backend

## Nodejs using Express

1. [`nanoid`](https://github.com/ai/nanoid#readme) utility used for generating URL friendly unique identifier for the the short URLs.
2. Returning existing short URL if a record for the corresponding long URL exist in the database.
3. `mongodb` used as the database for persisting records.
4. [`mongoose`](https://mongoosejs.com/docs/index.html) used for interacting with Mongodb.


## Steps to run : Backend

**Note:** Run backend first

**Configs:** Database connection settings needs to be upated in `backend/.env` file with the following keys

Sample values shown below.
```
DB_HOST=cluster0-shard1.mongodb.net:27017,cluster0-shard2.mongodb.net:27017,cluster0-shard3.mongodb.net:27017
DB_USER=abc
DB_PASS=abc
DB_COLLECTION=url_shortener
KEY_LENGTH=6
MAX_COLLISION_COUNT=2
```

**KEY_LENGTH** : Length of the key to be used as unique identifier
**MAX_COLLISION_COUNT** : Maximum number of retries in case of collisions with the same key length. If the number of collisions increase beyond this count, the `KEY_LENGTH` is increased by `1` temporarily to generate a longer unique key.


1. `cd backend`
2. `npm install`
3. `npm start`
4. Default port for backend is `8000`, which can again be overridden in `backend/.env` file.

---
# Frontend

## React

1. Basic interface to generate shortened URL links using a custom domain.
2. Option to copy the generated short URL to the clipboard.
3. Also included an interface to search for the long URL from a given short URL.

## Steps to run

**Configs:** Server `host` and `port` settings are present in the `.env` file in the root folder.

Update the `.env` as per the settings of the backend server.

Sample values shown below.

```

REACT_APP_SERVER_HOST=http://localhost
REACT_APP_SERVER_PORT=8000

```

1. In the root folder - `npm install`
2. `npm start`

---

# General comments and assumptions

1. URL's not tied to a specific user or domain. Therefore, not shortening the same long URL again. If a record for a particular long URL exists, the corresponding short URL record is returned irrespective of the domain.
2. `KEY_LENGTH` character short ID is generated using `nanoid` library. It uses 64 characters from the `[A-Za-z0-9_-]` character set to generate the identifier.
3. Initially I'm using 6 character long keys. 6 character identifier using 64 chars gives approximately 64^6 ( ~68 Billion ) unique identifiers, which should be sufficient for this use case. If collisions occur, the length of the KEY to be generated is increased dynamically if the collision threshold is crossed. The `KEY_LENGTH` and `MAX_COLLISION_COUNT` variables can be updated in the `backend/.env` file to increase the default length of the key.
