.PHONY: setup install

setup: 
	python3 -m venv automationvenv
	source ./automationvenv/bin/activate

install:
	pip install -r automation/requirements.txt
