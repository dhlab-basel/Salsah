## Releasing

 1. Communicate that a release is about to be released in the [DaSCH Github Channel](https://github.com/orgs/dhlab-basel/teams/dasch), so that no new Pull Requests are merged
 1. Create a new branch, e.g., `releasing-vX.X.X`
 1. Update the version number in `package.json` and `docs/jekyll/_config.yml`.
 1. Remove the `(not released yet)` text in the title of the release notes (docs/jekyll/_posts).
 1. Create a new page with the next version number including the `(not released yet)` text and add page to TOC.
 1. Update links in the new page to point to correct release tag and milestone.
 1. On Github - Create new milestone
 1. On Github - Move any open issues from current release milestone to the next release milestone.
 1. On Github - Close current milestone.
 1. Push and merge PR to `develop`.
 1. Travis CI will start a [CI build](https://travis-ci.org/dhlab-basel/Salsah/builds) for the new tag ~~and publish
    artifacts to Docker Hub~~.
 1. On Github - Tag the commit with the version string, e.g., `vX.X.X` and create a release.
 1. On Github - Copy the release notes from the docs to the release.
 1. Publish documentation.

-> in general, releases should be cut at least once per month and on the last working day of the month.
