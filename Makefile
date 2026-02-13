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

bash:
	docker exec -it wri_app bash

console:
	docker exec -it wri_app bash -c "cd /app && bundle exec rails console"

logs:
	docker compose logs -f app
	
deploy-prod:
	docker exec -it wri_app bash -c "cap production deploy"