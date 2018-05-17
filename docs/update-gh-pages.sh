#!/usr/bin/env bash

# This script updates the documentation on Salsah's GitHub page by pushing a commit to the gh-pages branch
# of the Salsah repository on GitHub.

# Before you run this script, you must be on the develop branch, having committed any changes
# you made there.

# If you don't want git to ask you for your username and password, use SSH instad of HTTPS
# to clone the Salsah repository.

set -e


# Set the temporary directory where we store the docs.

TMP_HTML="/tmp/salsah-docs"


# Get the current git branch and proof it's the develop branch

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ "$CURRENT_BRANCH" != "develop" ]
then
    echo "Current branch is $CURRENT_BRANCH, not develop"
    exit 1
fi


# Copy the jekyll docs content to a temporary directory.

rm -rf $TMP_HTML
mkdir $TMP_HTML
cp -R jekyll/_docs $TMP_HTML/
cp -R jekyll/_posts $TMP_HTML/
cp -R jekyll/assets $TMP_HTML/
cp -R jekyll/_config.yml $TMP_HTML/


# Switch to the gh-pages branch and remove the existing HTML docs from it.

git checkout gh-pages
git rm -rf ../_docs
git rm -rf ../_posts
git rm -rf ../assets
git rm -rf ../_config.yml


# Move the new docs from the temporary directory into the git repository tree.

mv $TMP_HTML/* ../


# Commit the changes to the gh-pages branch, and push to origin.

git add ../_docs ../_posts ../assets ../_config.yml
git commit -m "Update documentation on gh-pages"
git push origin gh-pages


# Switch back to the develop branch, and remove the leftover documentation directory.

git checkout develop
