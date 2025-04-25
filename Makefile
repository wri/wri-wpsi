.PHONY: setup install clean

setup:
	python3.10 -m venv automationvenv
	# source automationvenv/bin/activate # run directly in console

install:
	pip3 install --upgrade pip==22.0
	echo "Installing Python dependencies"
	if [ -f ./automation/requirements.txt ]; then pip install -r ./automation/requirements.txt; fi
	pip install rasterio
	pip install earthengine-api
	pip install earthengine-api --upgrade

clean:
	rm -rf automationvenv/
