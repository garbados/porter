# Porter

[demo]: http://porter.maxthayer.org
[peerpouch]: derp
[pouchsearch]: herp
[cloudant]: https://cloudant.com

Diary using PouchDB. To get started, check out the [demo][demo].

By storing your information in PouchDB, all your data is kept safe on your computer. That way, when you visit the [demo][demo], only your data is shown, even though it's a public URL.

Porter can replicate blog data with your friends, giving you the ability to share content with your friends in real-time using nothing but your browsers. No servers, no third parties. Just you, your friends, and the stuff you like. (Note: this feature is in development)

Porter is under heavy development, so see the Roadmap section for upcoming features.

## Install

To deploy your own Porter:

    git clone [this]
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
      tags: ['blog', 'money', 'fed', 'silly'],
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
* `/:tag`: all posts tagged with `:tag`, ex: `/blog` lists all posts tagged `blog`
* `/:tag/:id`: Displays the post with a matching `:id`. (`:tag` is, in fact, extraneous)
* `/:tag/:id/edit`: Edit the post with a matching `:id`. (again, `:tag` is extraneous)

Why is `:tag` sometimes extraneous? Descriptive URLs and backwards compatibility, more or less. For example, consider this URL:

    https://cloudant.com/blog/why-replication-is-awesome

There is no other post with the identifier `why-replication-is-awesome`, but `blog` tells people what to expect from the link's content. Plus, because it's extraneous, you can have a bit of fun:

    https://cloudant.com/harry-youre-a/pouchdb
    https://cloudant.com/written-by-turkeys/introducing-cloudant-python
    https://cloudant.com/sit-back-and-enjoy-some/mapreduce

:D

## Roadmap

In approximate order of priority.

* Social: Presently, Porter is just a diary. We'll be adding that whole "social-without-servers" thing momentarily. (Status: [PeerPouch][peerpouch] uses a centralized server as a "hub", so that's a no-go. Currently examining Bitmessage instead. If you have suggestions, file an issue!)
* Field auto-filling: Intelligently suggest options for Author, Tags.
* Login automatically: Save credentials so that your Porter syncs with designated remotes automatically.
* Better Search: Use [Pouch-Search][pouchsearch] to give Porter Lucene-style querying.
* Imitate Medium: They do content well. Stand on the shoulders of giants.

To find things to do, try `grep -r TODO assets/js`. I built most of this without internet access, so I left plenty undone for want of external documentation.