# In the Root Folder, execute this script with "python _tests/test-server.py"
import http.server
import socketserver
import os

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path != '/' and not os.path.splitext(self.path)[1]:
            # If no file extension, try adding .html
            if os.path.exists(self.path[1:] + '.html'):
                self.path += '.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

PORT = 8000
with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
