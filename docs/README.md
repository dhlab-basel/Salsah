# Salsah documentation

[GitHub page](https://dhlab-basel.github.io/Salsah) with documentation, manual (not ready yet) and landing page for [Salsah](https://github.com/dhlab-basel/Salsah) — the generic user interface / web application for [Knora](https://knora.org).

It uses the [Dokumentado theme](https://github.com/lakto/dokumentado) and is built with [Jekyll](http://jekyllrb.com/) version 3.3.1, but should support newer versions as well. 

## Dependencies

Bundler is required. 
If it is not installed on your machine, run:

~~~bash
$ gem install bundler
~~~

Install the dependencies with [Bundler](http://bundler.io/):

~~~bash
$ bundle install
~~~

Run `jekyll` commands through Bundler to ensure you're using the right versions:

~~~bash
$ bundle exec jekyll serve
~~~

To see the generated site, just visit `http://localhost:4000`.
