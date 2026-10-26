#!/usr/bin/env bash
#
# Unified Runner for Fusion ERP System
# Runs:
#   1. Fusion System Administrator (IAM Backend) on port 8001
#   2. Fusion Integrated Backend on port 8002
#   3. Fusion Integrated Frontend Client on port 5173
#

set -m # Enable job control so background processes get their own process group

# Default service token if not already set in environment
export TOKEN="${TOKEN:-fsvc_IokeDbMHN--rewd_g7gZPkLpD3MiwIZrPJsRKLR6jdY}"

# Colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m' # No Color

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ADMIN_DIR="/home/mohitj/Desktop/Software Engineering/Fusion_System_Administrator/Backend/backend"
ADMIN_PY="/home/mohitj/Desktop/Software Engineering/Fusion_System_Administrator/Backend/venv/bin/python"
INTEGRATED_DIR="$ROOT_DIR"
INTEGRATED_PY="$ROOT_DIR/.venv/bin/python"
CLIENT_DIR="$ROOT_DIR/client"

echo -e "${BOLD}======================================================${NC}"
echo -e "${BOLD}       Starting Fusion ERP Unified Environment        ${NC}"
echo -e "${BOLD}======================================================${NC}"
echo -e "Token: ${GREEN}${TOKEN:0:15}...${NC}"
echo -e "IAM Backend:        ${CYAN}http://127.0.0.1:8001${NC}"
echo -e "Integrated Backend: ${GREEN}http://127.0.0.1:8002${NC}"
echo -e "Frontend Client:    ${YELLOW}http://127.0.0.1:5173${NC}"
echo -e "Press ${BOLD}Ctrl+C${NC} to stop all services simultaneously."
echo -e "${BOLD}======================================================${NC}\n"

# Verify required directories and binaries exist
if [ ! -d "$ADMIN_DIR" ]; then
    echo -e "${RED}Error: Admin directory not found at $ADMIN_DIR${NC}"
    exit 1
fi

if [ ! -f "$ADMIN_PY" ]; then
    echo -e "${RED}Error: Admin Python virtualenv not found at $ADMIN_PY${NC}"
    exit 1
fi

if [ ! -f "$INTEGRATED_PY" ]; then
    echo -e "${RED}Error: Integrated Python virtualenv not found at $INTEGRATED_PY${NC}"
    exit 1
fi

# Cleanup handler on exit or Ctrl+C
cleanup() {
    trap - SIGINT SIGTERM EXIT
    echo -e "\n${BOLD}${RED}Received interrupt. Shutting down all services...${NC}"
    
    if [ -n "$PID_IAM" ] && kill -0 "$PID_IAM" 2>/dev/null; then
        pkill -P "$PID_IAM" 2>/dev/null || true
        kill "$PID_IAM" 2>/dev/null || true
    fi

    if [ -n "$PID_BACKEND" ] && kill -0 "$PID_BACKEND" 2>/dev/null; then
        pkill -P "$PID_BACKEND" 2>/dev/null || true
        kill "$PID_BACKEND" 2>/dev/null || true
    fi

    if [ -n "$PID_CLIENT" ] && kill -0 "$PID_CLIENT" 2>/dev/null; then
        pkill -P "$PID_CLIENT" 2>/dev/null || true
        kill "$PID_CLIENT" 2>/dev/null || true
    fi

    # Extra check for any lingering Django runservers on 8001 / 8002
    fuser -k 8001/tcp 2>/dev/null || true
    fuser -k 8002/tcp 2>/dev/null || true

    echo -e "${GREEN}All services successfully terminated.${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM EXIT

# 1. Start IAM Backend
(
    cd "$ADMIN_DIR"
    exec "$ADMIN_PY" manage.py runserver 127.0.0.1:8001 2>&1 | sed -u "s/^/$(printf "${CYAN}[IAM-8001]${NC} ")/"
) &
PID_IAM=$!

# 2. Start Fusion Integrated Backend
(
    cd "$INTEGRATED_DIR"
    exec "$INTEGRATED_PY" manage.py runserver 0.0.0.0:8002 2>&1 | sed -u "s/^/$(printf "${GREEN}[BACKEND-8002]${NC} ")/"
) &
PID_BACKEND=$!

# 3. Start Frontend Client
(
    cd "$CLIENT_DIR"
    exec npm run dev 2>&1 | sed -u "s/^/$(printf "${YELLOW}[CLIENT-VITE]${NC} ")/"
) &
PID_CLIENT=$!

# Wait for background processes
wait
