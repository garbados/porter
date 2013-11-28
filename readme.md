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

## Roadmap

In approximate order of priority.

* Social: Presently, Porter is just a diary. We'll be adding that whole "social-without-servers" thing momentarily.
* Sync with a server: replicate data to and from CouchDB or [Cloudant][cloudant] instances.
* Tagging!
* Categories!
* Better Search: The current search is pretty rudimentary. Using [Pouch-Search][pouchsearch], we can give it Lucene-style querying.