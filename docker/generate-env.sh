#!/bin/sh

# Create env.js file with environment variables
cat > /usr/share/nginx/html/env.js << EOF
window.ENV = {
  REACT_APP_API_URL: "${REACT_APP_API_URL:-}",
  REACT_APP_API_ACCESS_TOKEN: "${REACT_APP_API_ACCESS_TOKEN:-}",
};
EOF

# Start Nginx
nginx -g 'daemon off;' 