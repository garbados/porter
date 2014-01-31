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

There is only one object: the Post. It looks like this:

    {
      _id: 'how-i-made-a-million-dollars',
      type: 'porter', // always 'porter'; used for portability
      published: true,
      title: 'How I Made a Million Dollars',
      text: 'Today was my first day at the Fed managing the presses, and...',
      category: 'blog',
      tags: ['money', 'fed', 'silly'],
      author: 'Yours Truly'
    }

For the sake of ease, Porter tries to autofill these values where possible. For example, you can enter whatever for `author`, but a dropdown will let you choose from past authors.

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

## License

[MIT][mit], brolaf.