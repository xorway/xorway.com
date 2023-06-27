.PHONY: serve

all: css/xterm.css js/xterm.js js/xterm.js.map

# We download these using https://www.jsdelivr.com/ instead of npm, to avoid all
# the hassle the whole Node.js ecosystem puts upon us.
css/xterm.css:
	curl --fail-with-body https://cdn.jsdelivr.net/npm/xterm@5.2.1/css/xterm.css -o css/xterm.css

js/xterm.js:
	curl --fail-with-body https://cdn.jsdelivr.net/npm/xterm@5.2.1/lib/xterm.js -o js/xterm.js

js/xterm.js.map:
	curl --fail-with-body https://cdn.jsdelivr.net/npm/xterm@5.2.1/lib/xterm.js.map -o js/xterm.js.map

serve:
	python3 -m http.server 8000
