.PHONY: setup install clean

setup: clean
	python3.10 -m venv automationvenv
	source automationvenv/bin/activate

install:
	pip install pip==24.0
	pip install -r automation/requirements.txt

clean:
	rm -rf automationvenv/
