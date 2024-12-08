#!/bin/bash
docker network create network_private
docker network create network_public

# Run with KONG API
# docker-compose --project-directory kong-api-gateway --file kong-api-gateway/docker-compose.yml up -d

# Run with NODEJS
# docker-compose --project-directory nodejs-typescript --file nodejs-typescript/docker-compose.yml up -d

