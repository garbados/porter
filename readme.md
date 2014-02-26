# Porter

[![Build Status](https://travis-ci.org/garbados/porter.png?branch=master)](https://travis-ci.org/garbados/porter)
[![Coverage Status](https://coveralls.io/repos/garbados/porter/badge.png?branch=master)](https://coveralls.io/r/garbados/porter?branch=master)
[![Stories in Ready](https://badge.waffle.io/garbados/porter.png?label=ready)](http://waffle.io/garbados/porter)

[demo]: http://porter.maxthayer.org
[peerpouch]: https://github.com/natevw/PeerPouch
[pouchsearch]: https://github.com/pouchdb/pouchdb-search
[cloudant]: https://cloudant.com
[mit]: http://opensource.org/licenses/MIT

Diary using PouchDB. To get started, check out the [demo][demo].

By storing your information in PouchDB, all your data is kept safe on your computer. That way, when you visit the [demo][demo], only your data is shown, even though it's a public URL.

But, because it's PouchDB, you can sync your data with remote CouchDB and [Cloudant][cloudant] instances, so you can use Porter like an offline-ready admin interface to your CMS.

Here are some more features:

* Write posts in Markdown; Porter converts to HTML
* Distinguish published from draft posts
* Tagging, categorization, and authorship
* Search by text, tag, and category
* Autocomplete author and category based on past values
* Saves content to your browser, so you can access offline
* To share content, sync with CouchDB or Cloudant databases

Porter is under heavy development, so see the Roadmap section for upcoming features.

## Install

To deploy your own Porter:

    git clone git@github.com:garbados/porter.git
    cd porter
    npm install
    grunt server

Your very own porter is now live at <http://localhost:5000>.

Porter can be deployed as a couchapp. To do that, modify `config.json`'s `db` value to tell Porter where to stick the couchapp, then:

    grunt deploy

And now you're live! 

By default, Porter tries to deploy to

    http://localhost:5984/porter

After deploying, the resultant app will live at

    DATABASE/_design/app/_rewrite

## Objects

Porter has a variety of document types, detailed in the [types folder][], but here's what they have in common:

[types folder]: https://github.com/garbados/porter/tree/master/app/types

    {
      _id: 'post-url-slug',     # the URL slug used to find the post
      type: 'post',             # hints at the document's schema
      category: 'blog',         # or 'product', 'events', 'team', etc.
      tags: ['herp', 'derp'],   # an unordered array of descriptors
      author: 'Max Thayer'      # who originally authored the document
    }

For the sake of ease, Porter tries to autofill these values where possible. For example, you can enter whatever for `author`, but a dropdown will let you choose from past authors.

### Adding a Type

Porter constructs forms and templates for different document types dynamically, so adding a type involves only a few steps:

1. Add a `[type_name].js` file to `/app/types/`.
2. Use `SchemasProvider.addSchema(type, schema)` to inject your new schema into Porter. ([example][])
3. /dance

[example]: https://github.com/garbados/porter/blob/master/app/types/post.js

Schema objects look like this:

    {
      primary: 'title',     # what field is used to determine the document's URL slug
      fields: [             # ordered array of document fields
        {
          label: 'Title',   # the human-readable field name
          type: 'input',    # can be 'input', 'textarea', 'timepicker', or 'datepicker'
          model: 'title'    # the document field name, i.e. `doc[model]`
        }
      ]
    }

Autocomplete rules are hardcoded currently, so there's nothing to configure there. Specifically, `author` and `category` will attempt to autocomplete.

## Routes

Porter uses a simple but flexible routing system that mirrors the typical CMS:

* `/`: published posts
* `/drafts`: posts marked as drafts
* `/search`: rudimentary text search
* `/new`: create a new post
* `/sync`: synchronize with a remote CouchDB or [Cloudant][cloudant] instance
* `/tag/:tag`: all posts tagged with `:tag`, ex: `/tag/derp` lists all posts tagged `derp`
* `/:category`: all posts under `:category`, ex: `/blog` lists all posts categorized as `blog`
* `/:category/:id`: displays the post with a matching `:id`. (`:category` is, in fact, extraneous)
* `/:category/:id/edit`: edit the post with a matching `:id`. (again, `:category` is extraneous)

Why is `:category` sometimes extraneous? Descriptive URLs and backwards compatibility, more or less. For example, consider this URL:

    https://cloudant.com/blog/why-replication-is-awesome

There is no other post with the identifier `why-replication-is-awesome`, but `blog` tells people what to expect from the link's content. Plus, because it's extraneous, you can have a bit of fun:

    https://cloudant.com/harry-youre-a/pouchdb
    https://cloudant.com/written-by-turkeys/introducing-cloudant-python
    https://cloudant.com/sit-back-and-enjoy-some/mapreduce

:D

## Contribute

Looking for ways to get involved? Yay! Try these on for size:

* Check out the [waffleboard](https://waffle.io/garbados/porter), where we track issues.
* Clone the project, and do `grep -r TODO assets/{js,html}` to see what's left undone.

You're awesome!

## Tests

To run tests, try this:

    npm run-script fulltest

...which just does this:

    git clean -dxf    # remove files git doesn't care about
    npm install       # installs dependencies
    npm test          # runs the test suite

If you don't have an internet connection, or don't want to re-download dependencies, just run `npm test`.

If anything goes wrong, [file an issue](https://github.com/garbados/porter/issues/new)!

## License

[MIT][mit], brolaf.