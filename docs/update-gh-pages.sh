#!/usr/bin/env bash

# This script updates the documentation on Salsah's GitHub page by pushing a commit to the gh-pages branch
# of the Salsah repository on GitHub.

# Before you run this script, you must be on the develop branch, having committed any changes
# you made there.

# If you don't want git to ask you for your username and password, use SSH instad of HTTPS
# to clone the Salsah repository.

set -e

TMP_HTML="/tmp/salsah-html" # The temporary directory where we store built HTML.
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD) # The current git branch.

if [ "$CURRENT_BRANCH" != "develop" ]
then
    echo "Current branch is $CURRENT_BRANCH, not develop"
    exit 1
fi

# Build the HTML docs.

make html
#make jsonformat

# Copy the built HTML docs to a temporary directory.

rm -rf $TMP_HTML
mkdir $TMP_HTML
cp -R _build/html $TMP_HTML/guidelines

# Copy the search html file to an index

cp _build/html/search.html $TMP_HTML/guidelines/index.html


# Switch to the gh-pages branch and remove the existing HTML docs from it.

git checkout gh-pages
git rm -rf ../documentation/guidelines

# Move the new docs from the temporary directory into the git repository tree.

mv $TMP_HTML/ ../documentation

# Commit the changes to the gh-pages branch, and push to origin.

git add ../documentation/guidelines
git commit -m "Update documentation on gh-pages"
git push origin gh-pages

# Switch back to the develop branch, and remove the leftover documentation directory.

git checkout develop
rm -rf ../documentation
