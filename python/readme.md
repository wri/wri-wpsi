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
```
