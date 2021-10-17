#!/bin/bash

echo "build donumenta"
docker build . --build-arg CUSTOM_API_ENDPOINT="" -t slangenmaier/airrow-ui:donumenta-latest
docker push slangenmaier/airrow-ui:donumenta-latest
