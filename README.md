# Patient Heart Rate Service

NestJS backend for managing patients and heart rate readings.

## Running the project

```bash
npm install
npm run start:dev
```

Server runs on `http://localhost:3000`

## Endpoints

### Elevated heart rate events (> 100 bpm)

```bash
curl "http://localhost:3000/heart-rate-readings/elevated"
```

### Heart rate analytics for a patient within a time range

```bash
curl "http://localhost:3000/patients/1/heart-rate/analytics?from=2024-03-01T00:00:00Z&to=2024-03-01T23:59:59Z"
```

### Patient request count

```bash
curl "http://localhost:3000/patients/1/request-count"
```

## Thought process

The first decision was how to structure the project. I went with a layered architecture — controllers, services, domain, and repositories — so each part has one job and can change independently. Swapping in-memory storage for a real database means writing one new repository file, nothing else changes.

I kept business logic out of the service layer by introducing a `HeartRateAnalyticsCalculator` class in the domain. The service orchestrates — it fetches data, hands it to the calculator, and builds the response. The calculator itself is just pure functions, no framework involved, easy to test.

Request tracking lives in an interceptor — it increments the counter after a successful response and doesn't block it. Putting it in the patient service would mix two unrelated responsibilities.

One thing I debated was where to put the `elevated readings` filter. Initially it was in the service after calling `findAll()`, but that means loading every reading into memory just to filter. I moved it to a `findElevated()` method on the repository so when this eventually hits a real database it becomes a `WHERE` clause instead.

## Changes for a production real service

**Persistence** - add a database (e.g. PostgreSQL or MongoDB) and swap the in-memory repositories for real implementations. The interfaces and injection tokens mean the service layer doesn't change at all.

**Request tracking at scale** - the in-memory counter resets on restart and splits across multiple instances (if we run 2 servers, each has its own counter). A shared store like Redis with `INCR` would solve both problems and would be a one-file change in the infrastructure layer.

**Pagination** — `findElevated()` still returns everything. With real data you'd add cursor-based pagination to that endpoint before anything else.
