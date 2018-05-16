# Salsah documentation

[GitHub page](https://dhlab-basel.github.io/Salsah) with documentation for [Salsah](https://github.com/dhlab-basel/Salsah).

## Run the documentation locally

For the github page we're using Jekyll. To install Jekyll run:

`$ gem install jekyll bundler`

From root of `docs/jekyll` install the needed jekyll files

`$ bundle install`

and to run the site locally, run

`$ bundle exec jekyll serve`


## Publish on Github pages
The documentation is accessible on the [repository's Github page](https://dhlab-basel.github.io/Salsah).
To update this page, you must be on the develop branch, having committed any changes you made there.
Run the update-gh-pages shell-script in docs/ which will push a commit to gh-pages branch.

`$ ./update-gh-pages.sh`

The script updates the following folders and files:

* _docs/
* _posts/
* assets/
* _config.yml

The directory `_docs` contains sub-pages of the documentation. The files in `_posts` are for release notes. By updating the release notes in `_posts` it's important to update the version in _config.yml as well. In `assets` you can store images, scripts and styling files.
