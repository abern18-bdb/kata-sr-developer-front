#!/bin/bash

echo Node Version: $(node --version)
echo NPM Version: $(npm --version)

set -eux
rm ~/.npmrc | true
curl -u "${ARTIFACTORY_READER_USER}:${ARTIFACTORY_READER_API_KEY}" 'https://bbogdigital.jfrog.io/bbogdigital/api/npm/auth' >> ~/.npmrc
sed -i 's#_auth#//bbogdigital.jfrog.io/bbogdigital/api/npm/npm-bbta/:_auth#g' ~/.npmrc
sed -i 's#always-auth#//bbogdigital.jfrog.io/bbogdigital/api/npm/npm-bbta/:always-auth#g' ~/.npmrc
sed -i 's#email#//bbogdigital.jfrog.io/bbogdigital/api/npm/npm-bbta/:email#g' ~/.npmrc

npm ci || exit 1
