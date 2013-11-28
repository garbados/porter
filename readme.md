# Porter

[demo]: http://porter.maxthayer.org
[peerpouch]: derp
[cloudant]: https://cloudant.com

Diary using PouchDB, made social with WebRTC. To get started, check out the [demo][demo].

By storing your information in PouchDB, all your data is kept safe on your computer. That way, when you visit the [demo][demo], only your data is shown, even though it's a public URL.

Using [PeerPouch][peerpouch], Porter can replicate blog data with your friends, giving you the ability to share content with your friends in real-time using nothing but your browsers. No servers, no third parties. Just you, your friends, and the stuff you like.

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

## Roadmap

In approximate order of priority.

* Social: Presently, Porter is just a diary. We'll be adding that whole "social-without-servers" thing momentarily.
* Sync with a server: replicate data to and from CouchDB or [Cloudant][cloudant] instances.
* CMS-like fields and data: To be frank, I want to unseat Wordpress.
* Better Search: The current search is pretty rudimentary. Using [Pouch-Search][pouchsearch], we can give it Lucene-style querying.
* Imitate Medium: They do editing content well. Stand on the shoulders of giants.

To find things to do, try `grep -r TODO assets`