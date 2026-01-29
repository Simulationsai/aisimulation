FROM node:20-alpine

WORKDIR /app

COPY index.mjs /app/index.mjs

ENV SIMU_API_URL="http://host.docker.internal:3001"
ENV SIMU_NODE_TYPE="ultra"
ENV SIMU_NODE_NAME="Ultra Node (Docker)"
ENV SIMU_REPORT_INTERVAL_SECONDS="30"

CMD ["node", "/app/index.mjs"]
