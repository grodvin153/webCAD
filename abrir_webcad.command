#!/bin/zsh

cd "$(dirname "$0")" || exit 1

LOG_FILE="/tmp/webcad-vite.log"

for PORT in {5173..5180}; do
  URL="http://127.0.0.1:$PORT/"

  if curl -fsS "$URL" >/dev/null 2>&1; then
    open "$URL"
    exit 0
  fi

  npm run dev -- --host 127.0.0.1 --port "$PORT" --strictPort >"$LOG_FILE" 2>&1 &
  SERVER_PID=$!

  for _ in {1..32}; do
    if curl -fsS "$URL" >/dev/null 2>&1; then
      open "$URL"
      exit 0
    fi

    if ! kill -0 "$SERVER_PID" >/dev/null 2>&1; then
      break
    fi

    sleep 0.25
  done
done

echo "No se pudo arrancar webCAD. Revisa $LOG_FILE"
