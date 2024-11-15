## Using act to locally run github actions

you have to create a local image with the tag ubuntu-builder by running



```bash
docker build -f python/docker/Act.Dockerfile -t ubuntu-builder .
```

```bash
act -P ubuntu-latest=ubuntu-builder --pull=false --container-architecture linux/amd64 --secret-file .secrets workflow_dispatch --workflows '.github/workflows/cron_update_SPI24.yml'
```


## create venv for running python scripts

```
python3 -m venv automationvenv
source ./automationvenv/bin/activate

# check if virtual env working
pip list

pip install -r python/requirements.txt


```
## runing the crons


## Documentation

- pipreqs to update requirements.txt [pipreqs](https://github.com/bndr/pipreqs)
- pyenv [pyenv](https://github.com/pyenv/pyenv?tab=readme-ov-file#set-up-your-shell-environment-for-pyenv)

## Tests

```bash
python -m unittest discover -s automation
```