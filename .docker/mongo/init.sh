#!/bin/bash
set -e

mongosh --username "$MONGO_INITDB_ROOT_USERNAME" --password "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin \
-- "$MONGO_INITDB_DATABASE" <<EOF
  db.createUser(
    {
      user: "$MONGO_INITDB_BASE_USERNAME",
      pwd: "$MONGO_INITDB_BASE_PASSWORD",
      roles: [ { role: "readWrite", db: "$MONGO_INITDB_DATABASE" } ]
    }
  )
EOF
echo "Mongo users created."
