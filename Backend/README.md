# Usiwaste Backend

Flask REST API for Usiwaste — matches the models/routes from the project doc
(5 models + Favorites join table, JWT auth, 17+ JSON endpoints, 10 protected).

## Setup

```bash
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # then edit SECRET_KEY / JWT_SECRET_KEY / DATABASE_URL
flask db upgrade                 # creates tables from the existing migration
python3 run.py                   # runs on http://127.0.0.1:5000
```

If you change `app/models/*.py` later, generate a new migration:

```bash
flask db migrate -m "describe the change"
flask db upgrade
```

## Auth model

Two separate identities — **User** (customer) and **Business** — each with
their own signup/login. A JWT is issued with `type: "user"` or
`type: "business"` as an additional claim, and routes are locked to one type
or the other with `@user_required` / `@business_required` decorators in
`app/utils/auth_helpers.py`. Send the token as `Authorization: Bearer <token>`.

## Endpoints

| Method | Path                              | Auth      | Purpose |
|--------|-----------------------------------|-----------|---------|
| POST   | /api/auth/signup/user             | -         | Customer signup |
| POST   | /api/auth/signup/business         | -         | Business signup |
| POST   | /api/auth/login                   | -         | `{email, password, role}` login |
| POST   | /api/auth/forgot-password         | -         | Request reset link (emailed) |
| POST   | /api/auth/reset-password          | -         | `{token, role, password}` |
| GET    | /api/auth/me                      | either    | Current identity |
| GET    | /api/listings                     | -         | Browse live feed (`?status=`, `?page=`) |
| GET    | /api/listings/\<id\>               | -         | Listing detail |
| POST   | /api/listings                     | business  | Create listing |
| PUT    | /api/listings/\<id\>               | business  | Update own listing |
| DELETE | /api/listings/\<id\>               | business  | Delete own listing |
| GET    | /api/listings/mine                | business  | Business dashboard feed |
| POST   | /api/orders                       | user      | Reserve a listing |
| GET    | /api/orders                       | user      | My orders |
| PUT    | /api/orders/\<id\>                 | either    | User cancels / business marks picked_up |
| GET    | /api/favorites                    | user      | My favorites |
| POST   | /api/favorites                    | user      | Favorite a listing |
| DELETE | /api/favorites/\<id\>              | user      | Unfavorite |
| POST   | /api/reviews                      | user      | Review after pickup |
| GET    | /api/reviews/listing/\<id\>        | -         | Reviews for a listing |
| GET    | /api/reviews/business/\<id\>       | -         | Reviews for a business |
| GET    | /api/health                       | -         | Health check |

18 JSON endpoints, 11 protected — matches the doc's "17 endpoints, 10
protected" MVP target closely; adjust as your ERD/Figma dictate.

## Notes / things to double check against your ERD and Figma

- I built this from `usiwaste.odt`'s written spec (models, relationship
  cardinalities, endpoint counts) since the dbdiagram.io and Figma links are
  JS-rendered and I couldn't pull their content automatically. Compare
  `app/models/*.py` field-by-field against your actual ERD and tell me what
  to adjust (field names, extra columns, etc.).
- `flagged_stale` is on `Listing` per the doc's "captured now, surfaced
  later" note — no public reputation scoring endpoint yet (that's in your
  "Future adjustments" list).
- Password reset emails are best-effort (logged, not fatal) if
  `Flask-Mail` isn't configured — fine for local dev.

