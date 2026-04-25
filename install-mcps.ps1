# Create MCP root folder
New-Item -ItemType Directory -Force -Path ".cursor/mcp" | Out-Null

# Project Navigator MCP
New-Item -ItemType Directory -Force -Path ".cursor/mcp/project-navigator" | Out-Null
Invoke-WebRequest "https://raw.githubusercontent.com/modelcontextprotocol/mcp-project-navigator/main/mcp.json" -OutFile ".cursor/mcp/project-navigator/mcp.json"
Invoke-WebRequest "https://raw.githubusercontent.com/modelcontextprotocol/mcp-project-navigator/main/server.js" -OutFile ".cursor/mcp/project-navigator/server.js"

# Lint/Format MCP
New-Item -ItemType Directory -Force -Path ".cursor/mcp/lint-format" | Out-Null
Invoke-WebRequest "https://raw.githubusercontent.com/modelcontextprotocol/mcp-lint-format/main/mcp.json" -OutFile ".cursor/mcp/lint-format/mcp.json"
Invoke-WebRequest "https://raw.githubusercontent.com/modelcontextprotocol/mcp-lint-format/main/server.js" -OutFile ".cursor/mcp/lint-format/server.js"

# i18n Consistency MCP
New-Item -ItemType Directory -Force -Path ".cursor/mcp/i18n-consistency" | Out-Null
Invoke-WebRequest "https://raw.githubusercontent.com/modelcontextprotocol/mcp-i18n-consistency/main/mcp.json" -OutFile ".cursor/mcp/i18n-consistency/mcp.json"
Invoke-WebRequest "https://raw.githubusercontent.com/modelcontextprotocol/mcp-i18n-consistency/main/server.js" -OutFile ".cursor/mcp/i18n-consistency/server.js"

# Contrast MCP
New-Item -ItemType Directory -Force -Path ".cursor/mcp/contrast" | Out-Null
Invoke-WebRequest "https://raw.githubusercontent.com/modelcontextprotocol/mcp-contrast/main/mcp.json" -OutFile ".cursor/mcp/contrast/mcp.json"
Invoke-WebRequest "https://raw.githubusercontent.com/modelcontextprotocol/mcp-contrast/main/server.js" -OutFile ".cursor/mcp/contrast/server.js"
