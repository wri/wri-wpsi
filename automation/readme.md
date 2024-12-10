# Automations

this folder contains the code that it is used to perform updates in the file sources and the wps platform, it is a python package that holds the logic for performing periodic updates in the content.

### Automation statuses
![badge](https://github.com/wri/wri-wpsi/actions/workflows/cron_update_SPI24_mask/badge.svg)
![badge](https://github.com/wri/wri-wpsi/actions/workflows/cron_update_SPI24/badge.svg)
![badge](https://github.com/wri/wri-wpsi/actions/workflows/cron_update_SPI3/badge.svg)

## Quick usage guide

in order to be able to run this code you have to install a virtual environment for python and its related dependencies, for this we are using `venv` and a little help of `Makefile` so run the following commands

    make setup ## it will create the virtual environment required to work with the code
    make install ## it will install the required dependencies

to run the python code we recommend you to use a little bash script that it is going to help you to easily define the envs required for the code to run properly so within the automation folder run 

    cp .run-ee.example.sh .run.sh
    chmod +x run.sh
    ./automation/.run.sh

## Tests

to run the tests run the following command from root folder

    python -m unittest discover -s automation

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



